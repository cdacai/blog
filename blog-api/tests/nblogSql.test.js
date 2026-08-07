const assert = require('assert')
const fs = require('fs')
const path = require('path')

const sql = fs.readFileSync(path.join(__dirname, '../nblog.sql'), 'utf8')

const createDatabasePosition = sql.indexOf('CREATE DATABASE IF NOT EXISTS `nblog`')
const useDatabasePosition = sql.indexOf('USE `nblog`;')
const firstTablePosition = sql.indexOf('CREATE TABLE')
assert.ok(createDatabasePosition !== -1, 'initialization script must create the nblog database')
assert.ok(
	useDatabasePosition > createDatabasePosition && useDatabasePosition < firstTablePosition,
	'initialization script must select nblog before creating tables'
)

const expectedTables = [
	'about',
	'blog',
	'blog_tag',
	'category',
	'city_visitor',
	'comment',
	'exception_log',
	'friend',
	'login_log',
	'moment',
	'notification',
	'operation_log',
	'schedule_job',
	'schedule_job_log',
	'site_setting',
	'tag',
	'user',
	'visit_log',
	'visit_record',
	'visitor',
	'comment_report',
	'album',
	'album_image',
	'site_config',
	'qrtz_job_details',
	'qrtz_triggers',
	'qrtz_simple_triggers',
	'qrtz_simprop_triggers',
	'qrtz_cron_triggers',
	'qrtz_blob_triggers',
	'qrtz_calendars',
	'qrtz_paused_trigger_grps',
	'qrtz_locks',
	'qrtz_fired_triggers',
	'qrtz_scheduler_state',
]

expectedTables.forEach(table => {
	assert.ok(sql.includes(`CREATE TABLE \`${table}\``), `missing table: ${table}`)
})

assert.ok(sql.includes('`content` varchar(500)'), 'comment content must support 500 characters')
assert.ok(sql.includes("'adminCommentAvatar', '站长评论头像'"), 'missing admin comment avatar setting')
assert.ok(sql.includes("'adminEditorAppearance', '后台外观', 'system', 1"), 'missing editor appearance setting')

const createQuartzTablePosition = sql.indexOf('CREATE TABLE `qrtz_job_details`')
const insertQuartzTaskPosition = sql.indexOf('INSERT INTO qrtz_job_details')
assert.ok(
	createQuartzTablePosition !== -1 && createQuartzTablePosition < insertQuartzTaskPosition,
	'Quartz tables must be created before default task data is inserted'
)

assert.ok(
	sql.trimEnd().endsWith('SET FOREIGN_KEY_CHECKS = 1;'),
	'foreign key checks must be restored at the end of the initialization script'
)

console.log(`nblog.sql initialization test passed (${expectedTables.length} tables)`)
