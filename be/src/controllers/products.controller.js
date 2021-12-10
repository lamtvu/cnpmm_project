const productModel = require("./../models/products.model");
const { validationResult } = require("express-validator");
const { uploadImage } = require("../services/uploadimage.service");
const mongoose = require('mongoose')

const createProduct = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ status: 400, ...errors });
	}
	if (req.files["image"] != null) {
		var addImage = req.files["image"][0];
		const urlImage = await uploadImage(addImage.filename, "upload/");
		const newProduct = {
			category: req.body.category,
			name: req.body.name,
			description: req.body.description,
			producer: req.body.producer,
			detail: req.body.detail,
			image: (req.body.image = urlImage),
			price: req.body.price,
			discount: req.body.discount,
		};
		productModel.create(newProduct, (err) => {
			if (err) {
				return res.status(400).json({ status: 400, errors: [{ msg: err }] });
			}
			return res.status(200).json({ status: 200, data: null });
		});
	}
};

const deleteProduct = async (req, res) => {
	const productId = req.params.productId;
	productModel.deleteOne({ _id: productId }, (err) => {
		if (err) {
			return res.status(400).json({ status: 400, errors: [{ msg: err }] });
		}
		return res.status(200).json({ status: 200, data: null });
	});
};

const updateProduct = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({ msg: "Data to update can not empty" });
	}
	const productId = req.params.productId;
	if (req.files.image != null) {
		var addImage = req.files["image"][0];
		const urlImage = await uploadImage(addImage.filename, "upload/");
		req.body.image = urlImage;
	}
	await productModel
		.updateOne({ _id: productId }, req.body, {
			useFindAndModify: false,
		})
		.then((data) => {
			if (!data) {
				res.status(400).send({ msg: "Cannot update product" });
			} else {
				res.status(200).send({ msg: "Update successful !!!" });
			}
		})
		.catch((err) => {
			res.status(500).send({ msg: "Error update" });
		});
};

const getProduct = (req, res) => {
	productModel
		.findById(req.params.id)
		.populate("category")
		.populate("producer")
		.populate({
			path: 'discount',
			match: {
				endDate: { $gte: new Date().getTime() }
			}
		})
		.then((data) => {
			if (!data) {
				res.status(404).send({ msg: "Not found category" });
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res
				.status(500)
				.send({ msg: "Error retriving data with id: " + req.params.id });
		});
};

const getProducts = async (req, res) => {
	const { categories, producers } = req.body;

	const { limit = 20, page = 0 } = req.query;

	let query = {};
	if (categories && categories.length > 0)
		query = { ...query, category: { $in: categories.map(c => mongoose.Types.ObjectId(c)) } };
	if (producers && producers.length > 0)
		query = { ...query, producer: { $in: producers.map(p => mongoose.Types.ObjectId(p)) } };

	const ptemp = parseInt(page);
	const ltemp = parseInt(limit);

	console.log(query)
	try {
		const items = await productModel
			.aggregate()
			.match(query)
			.lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
			.lookup({ from: 'producers', localField: 'producer', foreignField: '_id', as: 'producer' })
			.lookup({
				from: 'discounts',
				let: { 'dc': '$discount' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$$dc', '$_id'] },
									{ $gte: ['$endDate', new Date().getTime()] },
								]
							}
						}
					}
				],
				as: 'discount'
			})
			.unwind(
				'category',
				'producer',
				{
					path: '$discount',
					preserveNullAndEmptyArrays: true
				})
			.facet({
				count: [{ $count: 'count' }],
				results: [{ $skip: ltemp * ptemp }, { $limit: ltemp }]
			})
			.addFields({
				count: { $arrayElemAt: ['$count.count', 0] }
			})
		console.log(items[0])

		res.status(200).json(items[0]);
	} catch (e) {
		console.log(e)
		res.status(500).json({ msg: "Internal Server Error" });
	}
};

const searchProducts = async (req, res) => {
	const { searchString = "", limit = 20, page = 0 } = req.query;
	const searchValue = searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(searchValue, "i");
	const idQuery = /^[a-f\d]{24}$/i.test(searchValue) ? searchString : undefined;

	const ptemp = parseInt(page);
	const ltemp = parseInt(limit);
	try {
		const items = await productModel.aggregate()
			.match({
				$or: [
					{ _id: idQuery },
					{ name: { $regex: regex } },
					{ description: { $regex: regex } },
				]
			})
			.lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
			.lookup({ from: 'producers', localField: 'producer', foreignField: '_id', as: 'producer' })
			.lookup({
				from: 'discounts',
				let: { 'dc': '$discount' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$$dc', '$_id'] },
									{ $gte: ['$endDate', new Date().getTime()] },
								]
							}
						}
					}
				],
				as: 'discount'
			})
			.unwind(
				'category',
				'producer',
				{
					path: '$discount',
					preserveNullAndEmptyArrays: true
				})
			.facet({
				count: [{ $count: 'count' }],
				results: [{ $skip: ltemp * ptemp }, { $limit: ltemp }]
			})
			.addFields({
				count: { $arrayElemAt: ['$count.count', 0] }
			})

		console.log(items[0])
		res.status(200).json(items[0]);
	} catch (e) {
		res.status(500).json({ msg: "Internal Server Error" });
	}
};

const getByIds = async (req, res) => {
	const { ids } = req.body;
	try {
		const products = await productModel.find({ _id: { $in: ids } });
		return res.status(200).json(products);
	} catch {
		res.status(500).json({ msg: "Internal Server Error" });
	}
};

module.exports = {
	createProduct,
	deleteProduct,
	updateProduct,
	getProducts,
	searchProducts,
	getProduct,
	getByIds,
};
