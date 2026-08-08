import {getSiteSettingData} from '@/api/siteSetting'

const {
	ADMIN_EDITOR_APPEARANCE_DEFAULT,
	normalizeAdminEditorAppearance,
	resolveAdminEditorAppearance,
} = require('@/utils/editorAppearance')

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

export default {
	data() {
		return {
			editorAppearanceMediaQuery: null,
		}
	},
	computed: {
		adminEditorAppearanceSetting() {
			return this.$store.state.settings.adminEditorAppearance || ADMIN_EDITOR_APPEARANCE_DEFAULT
		},
		systemPrefersDarkEditor() {
			return Boolean(this.$store.state.settings.systemPrefersDarkEditor)
		},
		resolvedAdminEditorAppearance() {
			return resolveAdminEditorAppearance(
				this.adminEditorAppearanceSetting,
				this.systemPrefersDarkEditor
			)
		},
		adminEditorAppearanceClass() {
			return `admin-editor-${this.resolvedAdminEditorAppearance}`
		},
		adminEditorBackground() {
			return this.resolvedAdminEditorAppearance === 'dark' ? '#1d2024' : '#ffffff'
		},
		adminEditorPreviewBackground() {
			return this.resolvedAdminEditorAppearance === 'dark' ? '#202327' : '#fbfbfb'
		},
		adminEditorToolbarsBackground() {
			return this.resolvedAdminEditorAppearance === 'dark' ? '#292d32' : '#ffffff'
		},
	},
	watch: {
		resolvedAdminEditorAppearance: {
			immediate: true,
			handler(appearance) {
				if (this.$options.adminAppearanceHost && typeof document !== 'undefined') {
					const isDark = appearance === 'dark'
					document.documentElement.classList.toggle('admin-editor-dark-active', isDark)
					document.body.classList.toggle('admin-editor-dark-active', isDark)
				}
			},
		},
	},
	created() {
		if (this.$options.adminAppearanceHost) {
			this.setupEditorAppearanceMediaQuery()
			this.loadAdminEditorAppearance()
		}
	},
	beforeDestroy() {
		if (!this.$options.adminAppearanceHost) {
			return
		}
		if (this.editorAppearanceMediaQuery) {
			if (this.editorAppearanceMediaQuery.removeEventListener) {
				this.editorAppearanceMediaQuery.removeEventListener('change', this.handleEditorAppearanceChange)
			} else if (this.editorAppearanceMediaQuery.removeListener) {
				this.editorAppearanceMediaQuery.removeListener(this.handleEditorAppearanceChange)
			}
		}
		if (typeof document !== 'undefined') {
			document.documentElement.classList.remove('admin-editor-dark-active')
			document.body.classList.remove('admin-editor-dark-active')
		}
	},
	methods: {
		setupEditorAppearanceMediaQuery() {
			if (typeof window === 'undefined' || !window.matchMedia) {
				return
			}
			this.editorAppearanceMediaQuery = window.matchMedia(DARK_MODE_QUERY)
			this.$store.dispatch('settings/changeSetting', {
				key: 'systemPrefersDarkEditor',
				value: this.editorAppearanceMediaQuery.matches,
			})
			if (this.editorAppearanceMediaQuery.addEventListener) {
				this.editorAppearanceMediaQuery.addEventListener('change', this.handleEditorAppearanceChange)
			} else if (this.editorAppearanceMediaQuery.addListener) {
				this.editorAppearanceMediaQuery.addListener(this.handleEditorAppearanceChange)
			}
		},
		handleEditorAppearanceChange(event) {
			this.$store.dispatch('settings/changeSetting', {
				key: 'systemPrefersDarkEditor',
				value: event.matches,
			})
		},
		async loadAdminEditorAppearance() {
			try {
				const res = await getSiteSettingData()
				const settings = res.data && Array.isArray(res.data.type1) ? res.data.type1 : []
				const appearanceSetting = settings.find(item => item.nameEn === 'adminEditorAppearance')
				this.$store.dispatch('settings/changeSetting', {
					key: 'adminEditorAppearance',
					value: normalizeAdminEditorAppearance(appearanceSetting && appearanceSetting.value),
				})
			} catch (error) {
				this.$store.dispatch('settings/changeSetting', {
					key: 'adminEditorAppearance',
					value: ADMIN_EDITOR_APPEARANCE_DEFAULT,
				})
			}
		},
	},
}
