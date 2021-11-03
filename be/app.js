const express = require('express');
const mongoose = require('mongoose');
const dotnet = require('dotenv');
const initRouter = require('./src/routes');

dotnet.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//connect db
const uridb = process.env.HOST || 'mongodb://localhost:27017/watchstoredb';
mongoose.connect(uridb);

//init routes
initRouter(app);

app.listen(PORT, () => console.log(`listen on ${PORT}`));
