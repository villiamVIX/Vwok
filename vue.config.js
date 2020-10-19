module.exports = {
	lintOnSave: false,
	devServer: {
		disableHostCheck: true,
		port:3009
	},
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'tools': '@/tools',
			}
		},
		externals: {
			//cdn
			vue: 'Vue',
			'element-ui': 'ELEMENT',
			'axios': 'axios',
			'qs': 'Qs',
			'vuex': 'Vuex',
			'vue-router': 'VueRouter'
		},
		// 优化Gzip打包
		// plugins: [
		// 	new CompressionWebpackPlugin({
		// 		filename: '[path].gz[query]',
		// 		algorithm: 'gzip',
		// 		test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
		// 		threshold: 10240,
		// 		minRatio: 0.8
		// 	})
		// ]
	},
	// 优化打包速度
	productionSourceMap: false,

}
