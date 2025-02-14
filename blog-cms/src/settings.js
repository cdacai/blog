module.exports = {
	/**
	 * @type {string}
	 * @description page title
	 */
	title: 'Observe\'s Admin',

	/**
	 * @type {string}
	 * @description logo URL
	 */
	logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',

	/**
	 * @type {boolean} true | false
	 * @description Whether fix the header
	 */
	fixedHeader: true,

	/**
	 * @type {boolean} true | false
	 * @description Whether show the logo in sidebar
	 */
	sidebarLogo: true,

	/**
	 * @type {Array}
	 * @description 默认展开的父级菜单
	 */
	defaultOpeneds: ['/blog'],

	/**
	 * @type {string}
	 * @description 前台站点地址
	 */
	blogUrl: 'https://www.caixiaohu.com',

	/**
	 * 图片压缩配置
	 */
	imageCompression: {
		blog: {
			maxWidth: 1000,
			quality: 0.8,
			maxSize: 150,
			keepFormat: true
		},
		moment: {
			maxWidth: 800,
			quality: 0.8,
			maxSize: 100,
			keepFormat: true
		}
	},

	/**
	 * 博客相关配置
	 */
	blog: {
		// 描述截取长度
		descriptionLength: 1000,
		// 每分钟阅读字数（用于计算阅读时长）
		wordsPerMinute: 300,
		// 自动保存配置
		autosave: {
			// 内容变化后延迟保存时间（毫秒）
			delay: 3000
		}
	}
}