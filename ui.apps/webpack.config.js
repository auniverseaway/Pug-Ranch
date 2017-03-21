const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const project = './src/main/content/jcr_root/apps/pugranch/clientlibs';

module.exports = {
    entry: {
        'common/publish': [ 
            project + '/common/publish/src/js/app.js', 
            project + '/common/publish/src/less/app.less' 
        ],
        'common/author': [ 
            project + '/common/author/src/js/app.js', 
            project + '/common/author/src/less/app.less' 
        ]
    },
    output: {
        path: project,
        filename: '[name]/dist/js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            url: false
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: '[name]/dist/css/app.css', disable: false })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',

    watch: true
};