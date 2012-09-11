var assert = require('assert');
var Project = require('../lib/b2t/Project');
var path = require('path');

var projectRoot = path.join(__dirname, '../demo/project');

describe('project base', function() {
	it('members', function(done) {
		var project = Project.load(projectRoot);
		assert.equal(project.root, projectRoot);
		assert.equal(project.name, 'market1');
		assert.equal(project.version, '0.0.1');
		done();
	});
});

describe('project page', function() {
	var project = Project.load(projectRoot);
	it('base', function(done) {
		project.getPages(function(err, pages) {
			assert.equal(pages.length, 1);
			done();
		});
	});
	it('template', function(done) {
		project.getPage('home', function(err, page) {
			page.getTemplate(function(err, template) {
				assert.ok(template);
				done();
			})
		});
	});
});
