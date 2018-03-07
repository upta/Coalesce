const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const PostCompile = require('post-compile-webpack-plugin')


const bundleOutputDir = './dist';

const typescript = require('typescript');
console.log("Typescript version: " + typescript.version)

function makeConfig(name){
    const inputFile = './src/' + name;
    const extension = path.extname(name);
    const nameWithoutExt = path.basename(inputFile, extension);
    
return (env) => {
    const isDevBuild = !(env && env.prod);

    return {
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        entry: { 
            [nameWithoutExt]: inputFile,
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            libraryTarget: "commonjs",
        },
        externals: [
            nodeExternals()
            // function(context, request, callback) {
            //     console.log(context, request)
            //     if (request !== inputFile && request.substring(0, 2) == "./"){
            //       return callback(null, 'commonjs ' + request);
            //     }
            //     callback();
            //   }
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                            // the "scss" and "sass" values for the lang attribute to the right configs here.
                            // other preprocessors should work out of the box, no loader config like this necessary.
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        }
                        // other vue-loader options go here
                    }
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        compilerOptions: {declaration: false}
                    }
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new PostCompile(() => {
                
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            }),

            // Turn on in order to display a visual representation of the size and contents of the bundle.
            // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin(),
            ])
    };
}
}

    
module.exports = [
    // Index
    makeConfig('index.ts'),

    // Standalone components
    makeConfig('c-select.vue'),
    makeConfig('c-input.vue'),
    makeConfig('c-datetime-picker.vue'),
    makeConfig('c-display.ts'),

    // Base classes
    makeConfig('c-metadata-component.ts'),
]
