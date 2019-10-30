var jsdom = require('jsdom');
var path = require('path');
var fs = require('fs');

function Page(root) {
	this.initialize(root);
}

Page.prototype.initialize = function(root) {
	this.root = root;
};

Page.prototype.getTemplate = function(callback) {
	fs.readFile(this.templateFile, 'utf-8', function(err, result) {
		jsdom.env(result, [
			'http://code.jquery.com/jquery-1.5.min.js'
		], function(err, result) {
			callback(err, result);
		});
	});
};

Page.prototype.toHTML = function(components, callback) {
	this.getTemplate(function(err, template) {
		var placeholders = template.$('*[bx-name]');
		placeholders.each(function(i) {
			var placeholder = template.$(this);
			var name = placeholder.attr('bx-name');
			var component = components[name];
			if (component) {
				placeholder.html(component.toHTML(component.defaultData, function() {
				}));
			} else {
			}
		});
		callback(null, template.document.documentElement.innerHTML);
	});
};

Object.defineProperties(Page.prototype, {
	'templateFile': {
		get: function() {
			return path.join(this.root, 'template.html');
		}
	}
});

module.exports = Page;
