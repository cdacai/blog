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
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .app-main'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-form'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-input__inner'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .editor-toolbar'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-select-dropdown'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-dialog'))
assert.ok(darkThemeStyles.includes('$editor-dark-canvas: #171b20;'))
assert.ok(darkThemeStyles.includes('$editor-dark-panel: #252b32;'))
assert.ok(darkThemeStyles.includes('$editor-dark-accent: #7eadd8;'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-container'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .sidebar-logo-container'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-menu-item.is-active'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-submenu .el-menu-item'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active .el-menu--vertical .el-menu--popup'))
assert.ok(darkThemeStyles.includes('.admin-editor-dark-active #app .sidebar-container .el-submenu.is-opened > .el-submenu__title'))
assert.ok(darkThemeStyles.includes('background-color: transparent !important;'))
assert.ok(darkThemeStyles.includes('.v-note-wrapper.admin-editor-dark textarea::-webkit-scrollbar-track'))
assert.ok(darkThemeStyles.includes('scrollbar-color: $editor-dark-border-strong $editor-dark-bg;'))
assert.ok(!darkThemeStyles.includes('$editor-dark-bg: #171717;'))
assert.ok(editorAppearanceMixin.includes("'#1f252c'"))
assert.ok(editorAppearanceMixin.includes("'#2d353f'"))
assert.ok(initialDatabaseSql.includes("'adminEditorAppearance', '后台外观', 'system', 1"))
assert.ok(existingDatabaseMigrationSql.includes('USE `nblog`;'))
assert.ok(existingDatabaseMigrationSql.includes('WHERE NOT EXISTS'))

console.log('editorAppearance tests passed')
