var util = require('util');
var fs = require('fs');
var path = require('path');
var async = require('async');
var Component = require('../b2t/Component');

function build(componentRoot, output, skinName, openBrowser) {
	async.auto({
		// read component
		'component': Component.load.bind(Component, componentRoot),
		// read skin
		'skin': ['component', function(callback, results) {
			var component = results.component;
			component.getSkin(skinName, callback);
		}],
		// make less to css
		'css': ['skin', function(callback, results) {
			var skin = results.skin;
			skin.toCSS(callback);
		}],
		// make template to html
		'html': ['component', function(callback, results) {
			var component = results.component;
			component.toHTML(component.defaultData, callback);
		}],
		// write html to file
		'write': ['html', 'css', function(callback, results) {
			var html = results.html;
			var css = results.css;
			var template = '<html><head><style>%s</style></head><body>%s</body></html>';
			var allHTML = util.format(template, css, html);
			fs.writeFile(output, allHTML, 'utf-8', callback);
		}],
		// open file to user
		'open': function() {
			if (openBrowser) {
				var spawn = require('child_process').spawn;
				spawn('open', [output]);
			}
			console.log('built');
		}
	});
}

exports.usage = 'component-preview [component-root]';

exports.options = {
	'-s, --skin <name>': ['skin. "default" as default.', String, 'default'],
	'-w, --watch': 'live preview.',
	'-o, --output <filename>': ['output filename. "./test.html" as default', String, './test.html'],
	'--f5': 'auto refresh browser(not finished).'
};

function watchDir(dir, onchange) {
	fs.readdir(dir, function(err, files) {
		files.forEach(function(file) {
			var filename = path.join(dir, file);
			fs.stat(filename, function(err, stats) {
				if (stats && stats.isDirectory()) {
					watchDir(filename, onchange);
				}
			});
		});
	});

	fs.watch(dir, {
		persistent: true
	}, onchange);
}

// make program not exit.
function hook() {
	setTimeout(hook, 1000);
}

exports.action = function(componentRoot, options) {
	componentRoot = componentRoot || process.cwd();
	componentRoot = Component.find(componentRoot);
	if (options.watch) {
		watchDir(componentRoot, function(event, filename) {
			return build(componentRoot, options.output, options.skin, false);
		});
		hook();
	} else {
		build(componentRoot, options.output, options.skin, true);
	}
};
