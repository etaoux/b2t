var fs = require('fs');
var less = require('less');
var path = require('path');
var util = require('util');

var MAIN_STYLE_FILE = 'index.less';

function Skin(root) {
	this.initialize(root);
}

Skin.prototype.initialize = function(root) {
	this.root = root;
	this.name = '';
	this.sizes = [];
	fs.readdirSync(this.root).forEach(function(file) {
		// w100h200.less
		// w100.less
		// h200.less
		// notice temp file like xx.less.tmp, xx.less~ so match full filename.
		if (file.match(/^(?:w(\d+))*(?:h(\d+))*\.less$/ig)) {
			this.sizes.push({
				width: RegExp.$1,
				height: RegExp.$2,
				filename: file
			});
		}
	}, this);
};

Skin.prototype.toCSS = function(callback) {
	var parser = new less.Parser({
	    paths: [this.root],
	    filename: 'style.less' // Specify a filename, for better error messages
	});

	var lessText = '';
	// TODO bug
	// I don't know why this line will make parse fail.
	//var lessText = '@import "index.less";\n';
	this.sizes.forEach(function(size) {
		lessText += util.format('@import "%s";\n', size.filename);
	});

	parser.parse(lessText, function(err, tree) {
	    var css = tree.toCSS({ compress: false });
		callback(err, css);
	});
};

module.exports = Skin;
