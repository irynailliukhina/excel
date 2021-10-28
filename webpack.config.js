const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyPlugin = require("copy-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = !isProd

    const filename = ext => isDev ? `[name].bundle.${ext}` : `[name].bundle.[contenthash].${ext}`;
    const plugins = () =>{
        const base = [
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
            new CopyPlugin({
                patterns: [{
                    from: path.resolve(__dirname, 'src', 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }]
            }),
            new MiniCssExtractPlugin({
                filename: filename('css')
            }),
        ]
        if (isDev) {
        }
        return base
    }

    return  {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['@babel/polyfill', '/index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'core'),
            }
        },
        devtool: isDev ? 'source-map' : false,
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            watchFiles: './',
        },
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    }
}