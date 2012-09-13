var async = require('async');
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
				page.toHTML(component.defaultData, callback);
			}],
			// write html to file
			'write': ['page', 'html', function(callback, results) {
				callback(null, null);
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
	build(projectRoot, name, 'test.html');
};
