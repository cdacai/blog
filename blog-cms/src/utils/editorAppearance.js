const ADMIN_EDITOR_APPEARANCE_DEFAULT = 'system'
const ADMIN_EDITOR_APPEARANCE_MODES = ['system', 'light', 'dark']

function normalizeAdminEditorAppearance(mode) {
	return ADMIN_EDITOR_APPEARANCE_MODES.includes(mode)
		? mode
		: ADMIN_EDITOR_APPEARANCE_DEFAULT
}

function resolveAdminEditorAppearance(mode, systemPrefersDark) {
	const normalizedMode = normalizeAdminEditorAppearance(mode)
	if (normalizedMode === ADMIN_EDITOR_APPEARANCE_DEFAULT) {
		return systemPrefersDark ? 'dark' : 'light'
	}
	return normalizedMode
}

module.exports = {
	ADMIN_EDITOR_APPEARANCE_DEFAULT,
	ADMIN_EDITOR_APPEARANCE_MODES,
	normalizeAdminEditorAppearance,
	resolveAdminEditorAppearance,
}
