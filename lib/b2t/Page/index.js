var jsdom = require('jsdom');
var path = require('path'); var fs = require('fs'); function Page(root) {
	this.initialize(root);
}

Page.prototype.initialize = function(root) {
	this.root = root;
	this.templateFile = path.join(this.root, 'template.html');
};

Page.prototype.getTemplate = function(callback) {
	fs.readFile(this.templateFile, 'utf-8', function(err, result) {
		jsdom.env(result, function(err, result) {
			callback(err, result);
		});
	});
};

Page.load = function(root, callback) {
	var page = new Page(root);
	page.getTemplate(function(err, template) {
		page.template = template;
		callback(err, page);
	});
};

module.exports = Page;
