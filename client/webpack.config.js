import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: "development",
    entry: path.resolve('src/index.js'),
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'images/[name][ext]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ],
    devServer: {
        hot: true,
        port: 3000,
        open: true
    }
};
