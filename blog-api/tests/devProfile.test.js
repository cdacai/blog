const assert = require('assert')
const fs = require('fs')
const path = require('path')

const devPropertiesPath = path.join(
	__dirname,
	'../src/main/resources/application-dev.properties'
)
const applicationPropertiesPath = path.join(
	__dirname,
	'../src/main/resources/application.properties'
)

assert.ok(fs.existsSync(devPropertiesPath), 'application-dev.properties must exist')

const devProperties = fs.readFileSync(devPropertiesPath, 'utf8')
const applicationProperties = fs.readFileSync(applicationPropertiesPath, 'utf8')
assert.ok(applicationProperties.includes('spring.profiles.active=prd'))
assert.ok(!applicationProperties.includes('spring.profiles.active=prd,dev'))
assert.ok(!devProperties.includes('spring.profiles.include=prd'))
assert.ok(/^spring\.redis\.password=$/m.test(devProperties))
assert.ok(devProperties.includes('blog.cors.origins='))
assert.ok(devProperties.includes('token.admin-comment-cookie-secure=false'))

console.log('development profile test passed')
