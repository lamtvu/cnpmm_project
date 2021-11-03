const jwt = require('jsonwebtoken');

const generateToken = (userData, secretKey, tokenLife) => new Promise((resolve, reject) => {
    jwt.sign(userData, secretKey, { expiresIn: tokenLife }, (err, encoded) => {
        if (err) return reject(err);
        return resolve(encoded);
    })
})

const verifyToken = (token, secretKey) => new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
    })
})

module.exports = {
    generateToken,
    verifyToken
}