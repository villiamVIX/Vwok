// 导入compression-webpack-plugin
const CompressionPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']


module.exports = {
	lintOnSave: false,
	devServer: {
		disableHostCheck: true,
		port: 4009,
		open: true
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
				'router' : '@/router'
			}
		},
		externals: {
			//cdn
			vue: 'Vue',
			// 'element-ui': 'ELEMENT',
			'axios': 'axios',
			'vuex': 'Vuex',
			'vue-router': 'VueRouter'
		},
		// 优化Gzip打包
		plugins: [
			new CompressionPlugin({
				algorithm: 'gzip', // 使用gzip压缩
				test: /\.js$|\.html$|\.css$/, // 匹配文件名
				filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
				minRatio: 1, // 压缩率小于1才会压缩
				threshold: 10240, // 对超过10k的数据压缩
				deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
			}),
		]
	},
	// 优化打包速度
	productionSourceMap: false,
	
}
