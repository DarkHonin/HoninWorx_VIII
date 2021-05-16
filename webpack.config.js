module.exports = {
    entry : "./src/app.jsx",
    mode : "development",
    module: {
        rules: [
          {
            test: /\.jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.sass$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.css$/i,
            use: [
              // Translates CSS into CommonJS
              "css-loader",
            ],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          }
        ]
      }
}