var assert = require('assert');
var pjct = require('../lib/b2t/project');
var path = require('path');

var projectRoot = path.join(__dirname, '../demo/package');

describe('project base', function() {
	it('members', function(done) {
		var project = pjct.load(projectRoot);
		assert.equal(project.name, 'market1');
		assert.equal(project.version, '0.0.1');
		done();
	});
});
