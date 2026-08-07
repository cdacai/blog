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
			adminEditorAppearanceSetting: ADMIN_EDITOR_APPEARANCE_DEFAULT,
			systemPrefersDarkEditor: false,
			editorAppearanceMediaQuery: null,
		}
	},
	computed: {
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
			return this.resolvedAdminEditorAppearance === 'dark' ? '#1f252c' : '#ffffff'
		},
		adminEditorPreviewBackground() {
			return this.resolvedAdminEditorAppearance === 'dark' ? '#242b33' : '#fbfbfb'
		},
		adminEditorToolbarsBackground() {
			return this.resolvedAdminEditorAppearance === 'dark' ? '#2d353f' : '#ffffff'
		},
	},
	watch: {
		resolvedAdminEditorAppearance: {
			immediate: true,
			handler(appearance) {
				if (typeof document !== 'undefined') {
					document.body.classList.toggle('admin-editor-dark-active', appearance === 'dark')
				}
			},
		},
	},
	created() {
		this.setupEditorAppearanceMediaQuery()
		this.loadAdminEditorAppearance()
	},
	beforeDestroy() {
		if (this.editorAppearanceMediaQuery) {
			if (this.editorAppearanceMediaQuery.removeEventListener) {
				this.editorAppearanceMediaQuery.removeEventListener('change', this.handleEditorAppearanceChange)
			} else if (this.editorAppearanceMediaQuery.removeListener) {
				this.editorAppearanceMediaQuery.removeListener(this.handleEditorAppearanceChange)
			}
		}
		if (typeof document !== 'undefined') {
			document.body.classList.remove('admin-editor-dark-active')
		}
	},
	methods: {
		setupEditorAppearanceMediaQuery() {
			if (typeof window === 'undefined' || !window.matchMedia) {
				return
			}
			this.editorAppearanceMediaQuery = window.matchMedia(DARK_MODE_QUERY)
			this.systemPrefersDarkEditor = this.editorAppearanceMediaQuery.matches
			if (this.editorAppearanceMediaQuery.addEventListener) {
				this.editorAppearanceMediaQuery.addEventListener('change', this.handleEditorAppearanceChange)
			} else if (this.editorAppearanceMediaQuery.addListener) {
				this.editorAppearanceMediaQuery.addListener(this.handleEditorAppearanceChange)
			}
		},
		handleEditorAppearanceChange(event) {
			this.systemPrefersDarkEditor = event.matches
		},
		async loadAdminEditorAppearance() {
			try {
				const res = await getSiteSettingData()
				const settings = res.data && Array.isArray(res.data.type1) ? res.data.type1 : []
				const appearanceSetting = settings.find(item => item.nameEn === 'adminEditorAppearance')
				this.adminEditorAppearanceSetting = normalizeAdminEditorAppearance(
					appearanceSetting && appearanceSetting.value
				)
			} catch (error) {
				this.adminEditorAppearanceSetting = ADMIN_EDITOR_APPEARANCE_DEFAULT
			}
		},
	},
}
