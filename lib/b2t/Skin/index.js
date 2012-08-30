var fs = require('fs');
var less = require('less');
var path = require('path');

var MAIN_STYLE_FILE = 'index.less';

function Skin(root) {
	this.initialize(root);
}

Skin.load = function(root, callback) {
	var skin = new Skin(root);
	skin.load(callback);
};

Skin.prototype.initialize = function(root) {
	this.root = root;
	this.name = '';
};

Skin.prototype.load = function(callback) {
	var styleFile = path.join(this.root, MAIN_STYLE_FILE);
	// TODO sizes
	this.sizes = 1;
	callback(null, this);
};

Skin.prototype.toCSS = function(callback) {
	var parser = new less.Parser({
	    paths: [this.root],
	    filename: 'style.less' // Specify a filename, for better error messages
	});

	// TODO
	parser.parse('@import "900x.less"; .class {width: 1 + 1;}', function (err, tree) {
	    var css = tree.toCSS({ compress: false });
		callback(err, css);
	});
};

module.exports = Skin;
