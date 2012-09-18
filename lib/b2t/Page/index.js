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
		jsdom.env(result, function(err, result) {
			callback(err, result);
		});
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
