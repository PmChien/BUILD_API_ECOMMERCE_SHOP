const productRoute = require('./product.route')
const categoriesRoute = require('./categories.route')
const ordersRoute = require('./orders.route')
const usersRoute = require('./users.route')
require('dotenv').config();
const api = process.env.API_URL
function router(app)
{
    app.use(`${api}/products`,productRoute);
    app.use(`${api}/categories`,categoriesRoute);
    app.use(`${api}/orders`,ordersRoute);
    app.use(`${api}/user`,usersRoute);
}
module.exports = router