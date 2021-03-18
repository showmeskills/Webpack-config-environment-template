const path = require('path');

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'scripts/[name].bundle.js',
        path:path.resolve('dist'),
        //publicPath:'/'
    },
    devServer:{
        open:true,
        hot:true,
        compress:true,
    }
}