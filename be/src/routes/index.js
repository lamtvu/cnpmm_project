const authRoute = require('./auth.route.js');
const customerRoute = require('./customer.route.js');

const initRouter = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/customer', customerRoute);
}

module.exports = initRouter;
