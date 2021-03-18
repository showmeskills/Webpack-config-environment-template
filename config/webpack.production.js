const path = require('path');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'scripts/[name].[hash:5].bundle.js',
        path:path.resolve('dist'),
        //publicPath:'/'
    },
}