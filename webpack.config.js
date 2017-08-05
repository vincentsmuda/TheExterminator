const path = require('path'),
      LiveReloadPlugin = require('webpack-livereload-plugin'),
      variables = require(path.resolve(__dirname, 'source/js/helpers/variables.js'));

module.exports = {
  entry: [
    'classlist-polyfill',
    'babel-polyfill',
    './source/entry.js'
  ],
  output: {
    filename: 'exterminator.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

      // For all js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // For SCSS
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: "@epegzz/sass-vars-loader",
            options: {
              vars: variables.scss.get()
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin()
  ],
  watch: true
};
