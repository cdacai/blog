const assert = require('assert')
const fs = require('fs')
const path = require('path')
const {
	ADMIN_EDITOR_APPEARANCE_DEFAULT,
	normalizeAdminEditorAppearance,
	resolveAdminEditorAppearance,
} = require('../src/utils/editorAppearance')

assert.strictEqual(ADMIN_EDITOR_APPEARANCE_DEFAULT, 'system')
assert.strictEqual(normalizeAdminEditorAppearance('light'), 'light')
assert.strictEqual(normalizeAdminEditorAppearance('dark'), 'dark')
assert.strictEqual(normalizeAdminEditorAppearance('system'), 'system')
assert.strictEqual(normalizeAdminEditorAppearance('invalid'), 'system')
assert.strictEqual(normalizeAdminEditorAppearance(), 'system')

assert.strictEqual(resolveAdminEditorAppearance('light', true), 'light')
assert.strictEqual(resolveAdminEditorAppearance('dark', false), 'dark')
assert.strictEqual(resolveAdminEditorAppearance('system', false), 'light')
assert.strictEqual(resolveAdminEditorAppearance('system', true), 'dark')
assert.strictEqual(resolveAdminEditorAppearance('invalid', true), 'dark')

const darkThemeStyles = fs.readFileSync(
	path.join(__dirname, '../src/assets/styles/editor-appearance.scss'),
	'utf8'
)
const editorAppearanceMixin = fs.readFileSync(
	path.join(__dirname, '../src/mixins/editorAppearance.js'),
	'utf8'
)
const writeBlogView = fs.readFileSync(
	path.join(__dirname, '../src/views/blog/blog/WriteBlog.vue'),
	'utf8'
)
const adminLayoutView = fs.readFileSync(
	path.join(__dirname, '../src/layout/index.vue'),
	'utf8'
)
const settingsStore = fs.readFileSync(
	path.join(__dirname, '../src/store/modules/settings.js'),
	'utf8'
)
const siteSettingView = fs.readFileSync(
	path.join(__dirname, '../src/views/page/SiteSetting.vue'),
	'utf8'
)
const dashboardView = fs.readFileSync(
	path.join(__dirname, '../src/views/dashboard/index.vue'),
	'utf8'
)
const readmeZh = fs.readFileSync(path.join(__dirname, '../../README.md'), 'utf8')
const readmeEn = fs.readFileSync(path.join(__dirname, '../../README_EN.md'), 'utf8')
const initialDatabaseSql = fs.readFileSync(
	path.join(__dirname, '../../blog-api/nblog.sql'),
	'utf8'
)
const existingDatabaseMigrationSql = fs.readFileSync(
	path.join(__dirname, '../../blog-api/src/main/resources/db/admin_editor_appearance.sql'),
	'utf8'
)

assert.ok(darkThemeStyles.includes('.popup-dropdown'))
assert.ok(darkThemeStyles.includes('.v-note-navigation-content'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .navbar'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .navbar {\n\tbackground-color: $editor-dark-canvas !important;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .navbar {\n\tbackground-color: $editor-dark-canvas !important;\n\tborder: 0 !important;\n\tbox-shadow: none !important;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-logo-container {\n\tbackground-color: $editor-dark-submenu !important;\n\tborder: 0 !important;\n\tbox-shadow: none !important;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-container .el-scrollbar__bar.is-vertical {\n\topacity: 0 !important;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-card'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-table'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-pagination'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-radio-button__inner'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-popover'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-dropdown-menu'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .notification-list'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .album-manager'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .card-panel-text'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .app-main'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-form'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-input__inner'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .editor-toolbar'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .editor-toolbar {\n\tbackground-color: transparent !important;\n\tborder: 0;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-select-dropdown'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-dialog'))
assert.ok(darkThemeStyles.includes('$editor-dark-canvas: #181a1d;'))
assert.ok(darkThemeStyles.includes('$editor-dark-panel: #23262a;'))
assert.ok(darkThemeStyles.includes('$editor-dark-icon: #88929d;'))
assert.ok(darkThemeStyles.includes('$editor-dark-accent: #78a6d1;'))
assert.ok(darkThemeStyles.includes('$editor-dark-sidebar: $editor-dark-canvas;'))
assert.ok(darkThemeStyles.includes('$editor-dark-submenu: $editor-dark-canvas;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-container'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-logo-container'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-menu-item.is-active'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-submenu .el-menu-item'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-menu--vertical .el-menu--popup'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-submenu.is-opened > .el-submenu__title'))
assert.ok(darkThemeStyles.includes('background-color: transparent !important;'))
assert.ok(darkThemeStyles.includes('.v-note-wrapper.admin-editor-dark textarea::-webkit-scrollbar-track'))
assert.ok(darkThemeStyles.includes('scrollbar-color: $editor-dark-border-strong $editor-dark-bg;'))
assert.ok(darkThemeStyles.includes('.v-note-wrapper.admin-editor-dark .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar'))
assert.ok(darkThemeStyles.includes('box-shadow: inset 3px 0 0 $editor-dark-accent'))
assert.ok(darkThemeStyles.includes('.v-note-wrapper.admin-editor-dark .v-note-op .op-icon.selected'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .navbar .user-avatar'))
assert.ok(darkThemeStyles.includes('body.admin-editor-dark-active::-webkit-scrollbar-thumb'))
assert.ok(darkThemeStyles.includes('html.admin-editor-dark-active::-webkit-scrollbar-thumb'))
assert.ok(!darkThemeStyles.includes('$editor-dark-bg: #171717;'))
assert.ok(editorAppearanceMixin.includes("'#1d2024'"))
assert.ok(editorAppearanceMixin.includes("'#292d32'"))
assert.ok(editorAppearanceMixin.includes("document.documentElement.classList.toggle('admin-editor-dark-active'"))
assert.ok(editorAppearanceMixin.includes('this.$options.adminAppearanceHost'))
assert.ok(editorAppearanceMixin.includes("this.$store.dispatch('settings/changeSetting'"))
assert.ok(adminLayoutView.includes("import editorAppearance from '@/mixins/editorAppearance'"))
assert.ok(adminLayoutView.includes('mixins: [ResizeMixin, editorAppearance]'))
assert.ok(adminLayoutView.includes('adminAppearanceHost: true'))
assert.ok(settingsStore.includes("adminEditorAppearance: 'system'"))
assert.ok(settingsStore.includes('systemPrefersDarkEditor: false'))
assert.ok(siteSettingView.includes("this.$store.dispatch('settings/changeSetting'"))
assert.ok(dashboardView.includes('mixins: [editorAppearance]'))
assert.ok(dashboardView.includes('applyDashboardChartAppearance'))
assert.ok(writeBlogView.includes('class="article-title-column"'))
assert.ok(writeBlogView.includes('.editor-toolbar {\n\tmargin-bottom: 10px;\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 0;\n\tbackground-color: transparent;\n\theight: auto;'))
assert.ok(writeBlogView.includes(':xl="16"'))
assert.ok(initialDatabaseSql.includes("'adminEditorAppearance', '后台外观', 'system', 1"))
assert.ok(existingDatabaseMigrationSql.includes('USE `nblog`;'))
assert.ok(existingDatabaseMigrationSql.includes('WHERE NOT EXISTS'))
assert.ok(readmeZh.includes('[EXTEND] 暗黑模式覆盖整个后台管理界面'))
assert.ok(readmeZh.includes('不会改变博客前台主题'))
assert.ok(readmeEn.includes('[EXTEND] Dark mode covers the entire admin interface'))
assert.ok(readmeEn.includes('does not change the public blog theme'))

console.log('editorAppearance tests passed')
