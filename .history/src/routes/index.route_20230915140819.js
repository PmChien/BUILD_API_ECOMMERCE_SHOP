const productRoute = require('./product.route')
require('dotenv').config();
const api = process.env.API_URL
function router(app)
{
    app.use(`${api}/products`,productRoute);
}
module.exports = router