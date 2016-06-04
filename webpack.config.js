var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: [
		"./public/assets/index"
	],
	output: {
		path: "./public/js/",
		filename: "script.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/ , loader: 'url?limit=100000&name=[name].[ext]' }
		]
	},
	plugins: [
    new ExtractTextPlugin("../css/style.css")
  ]
}
