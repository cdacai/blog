const {
	BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
module.exports = {
	productionSourceMap: false,
	
	css: {
		extract: {
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		},
		sourceMap: false,
		requireModuleExtension: true
	},
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'api': '@/api',
				'views': '@/views',
				'plugins': '@/plugins'
			}
		},

		plugins: [process.env.ANALYZE && new BundleAnalyzerPlugin()].filter(Boolean),

		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 6,
				cacheGroups: {
					// 首屏必需的基础包
					basic: {
						name: 'chunk-basic',
						test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
						priority: 40,
						chunks: 'initial'
					},
					// 其他配置保持不变
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
							return `npm.${packageName.replace("@", "")}`;
						},
						priority: 10,
						chunks: 'async'
					},
					commons: {
						name: 'chunk-commons',
						test: /[\\/]src[\\/]components[\\/]/,
						minChunks: 2,
						priority: 5,
						reuseExistingChunk: true
					},
					elementUI: {
						name: 'chunk-elementUI',
						test: /[\\/]node_modules[\\/]element-ui[\\/]/,
						chunks: 'all',
						priority: 30,
						reuseExistingChunk: true
					},
					momentjs: {
						name: 'moment',
						test: /[\\/]node_modules[\\/]moment.js[\\/]/,
						chunks: 'all',
						priority: 40,
						reuseExistingChunk: true
					},
					moment: {
						name: 'moment',
						test: /[\\/]node_modules[\\/]moment[\\/]/,
						chunks: 'all',
						priority: 30,
						reuseExistingChunk: true
					},
					postcss: {
						name: 'postcss',
						test: /[\\/]node_modules[\\/]postcss[\\/]/,
						chunks: 'all',
						priority: 30,
						reuseExistingChunk: true
					},
					viewerjs: {
						name: 'viewerjs',
						test: /[\\/]node_modules[\\/]viewerjs[\\/]/,
						chunks: 'all',
						priority: 30,
						reuseExistingChunk: true
					},
				}
			}
		}
	},
	devServer: {
		proxy: {
			'/blog/api': {
				target: 'http://localhost:8090',
				changeOrigin: true
			}
		}
	}
}