var fs = require('fs');
var path = require('path');
var pkginfo = require('pkginfo');

const CONFIG_FILE = 'project.json';

function check(root) {
	return fs.existsSync(path.join(root, CONFIG_FILE));
}

function ConfigLoader() {
}

ConfigLoader.prototype.load = function(root, callback) {
	var config = require(path.join(root, CONFIG_FILE));
	// pkginfo.read api can't receive a folder argument, must a filename.
	var packageConfig = pkginfo.read(module, path.join(root, '/x'));
	config.version = packageConfig.package.version;
	callback(null, config);
};

exports.check = check;
exports.createLoader = function() {
	return new ConfigLoader();
};
