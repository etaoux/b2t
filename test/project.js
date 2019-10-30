var assert = require('assert');
var Project = require('../lib/b2t/Project');
var path = require('path');

var projectRoot = path.join(__dirname, '../demo/project');

describe('project base', function() {
	it('members', function(done) {
		Project.load(projectRoot, function(err, project) {
			assert.equal(project.root, projectRoot);
			assert.equal(project.name, 'market1');
			assert.equal(project.version, '0.0.1');
			done();
		});
	});
});

describe('project components', function() {
	it('components', function() {
	});
});

describe('project page', function() {
	Project.load(projectRoot, function(err, project) {
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
		it('build', function(done) {
			project.getPage('home', function(err, page) {
				// TODO
				done();
			});
		});
	});
});
