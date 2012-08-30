var util = require('util');
var fs = require('fs');
var path = require('path');
var Component = require('../b2t/Component');

exports.usage = 'component-preview [component-root]';

exports.action = function(componentRoot) {
	componentRoot = componentRoot || process.cwd();
	componentRoot = Component.find(componentRoot);
	console.log(componentRoot)
	var tempFile = path.join(componentRoot, 'test.html');
	Component.load(componentRoot, function(err, component) {
		component.toHTML(component.defaultData, function(err, html) {
			component.getSkin('default', function(err, skin) {
				skin.toCSS(function(err, css) {
					var template = '<html><head><style>%s</style></head><body>%s</body></html>';
					var allHTML = util.format(template, css, html);
					fs.writeFile(tempFile, allHTML, 'utf-8', function(err) {
						var spawn = require('child_process').spawn;
						spawn('open', [tempFile]);
					});
				});
			});
		});
	});
};
