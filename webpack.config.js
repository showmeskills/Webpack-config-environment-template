const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin=require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin=require('terser-webpack-plugin');

const mode = process.env.NODE_ENV;
const modeFlag = mode === 'production'? true:false;
const mergeConfig = require(`./config/webpack.${mode}.js`);
const {merge} = require('webpack-merge')
const webpackConfig = {
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,      
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers:'last 2 version',
                                        }
                                    ]
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test:/\.less/i,
                use:[ 
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers:'last 2 version',
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule:false,
                }
            },
            {
                test:/\.(jpg|png|gif)$/i,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:modeFlag?'[name].[hash:5].[ext]' :'[name].[ext]',
                            outputPath:'images',
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),//如果输出的目录不是dist,就需要在这里指定下new CleanWebpackPlugin('bundle')
        new HTMLWebpackPlugin({
            template:path.join(__dirname,'src/index.html'),
            inject:'body',
        }),
        new MiniCssExtractPlugin({
            filename:modeFlag?'css/[name].[hash:5].css' :'css/[name].css',
       }),
    ],
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ],
    }
}

module.exports = merge(webpackConfig,mergeConfig)
