var async = require('async');
var fs = require('fs');
var Project = require('../b2t/Project');

function build(projectRoot, pageName, output, openBrowser) {
	Project.load(projectRoot, function(err, project) {
		async.auto({
			'components': function(callback, results) {
				project.getComponents(callback);
			},
			'page': function(callback, results) {
				project.getPage(pageName, callback);
			},
			// make template to html
			'html': ['page', 'components', function(callback, results) {
				var page = results.page;
				page.toHTML(results.components, callback);
			}],
			// write html to file
			'write': ['html', function(callback, results) {
				var html = results.html;
				fs.writeFile(output, html, 'utf-8', callback);
			}]
		},
		// open file to user
		function() {
			if (openBrowser) {
				var spawn = require('child_process').spawn;
				spawn('open', [output]);
			}
			console.log('built');
		});
	});
}

exports.usage = 'page-preview <name>';

exports.action = function(name) {
	var projectRoot = Project.find(process.cwd());
	build(projectRoot, name, 'test.html', true);
};
