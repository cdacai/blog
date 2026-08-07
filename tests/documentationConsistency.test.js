const assert = require('assert')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8')

const requiredDocuments = [
	'README.md',
	'README_EN.md',
	'blog-api/deployment-guide.md',
]

requiredDocuments.forEach(relativePath => {
	assert.ok(fs.existsSync(path.join(root, relativePath)), `missing document: ${relativePath}`)
})

const readmeZh = read('README.md')
const readmeEn = read('README_EN.md')
const deploymentZh = read('blog-api/deployment-guide.md')

const localStartCommand = 'mvn spring-boot:run "-Dspring-boot.run.profiles=prd,dev"'
assert.ok(readmeZh.includes(localStartCommand))
assert.ok(readmeEn.includes(localStartCommand))
assert.ok(deploymentZh.includes(localStartCommand))

assert.ok(readmeZh.includes('站长评论模式'))
assert.ok(readmeEn.includes('Administrator Comment Mode'))
assert.ok(readmeZh.includes('500'))
assert.ok(readmeEn.includes('500'))
assert.ok(readmeZh.includes('后台编辑工作区外观'))
assert.ok(readmeEn.includes('Admin Editing Workspace Appearance'))

assert.ok(!deploymentZh.includes('schema/quartz_tables.sql'))
assert.ok(deploymentZh.includes('admin_editor_appearance.sql'))

console.log('bilingual documentation consistency test passed')
