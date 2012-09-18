var fs = require('fs');
var path = require('path');
var pkginfo = require('pkginfo');

const CONFIG_FILE = 'component.json';

function ConfigLoader() {
}

ConfigLoader.prototype.load = function(root, callback) {
	var configFile = path.join(root, CONFIG_FILE);
	fs.readFile(configFile, 'utf-8', function(err, result) {
		var config = JSON.parse(result);
		// pkginfo.read api can't receive a folder argument, must a filename.
		var packageConfig = pkginfo.read(module, path.join(root, '/x'));
		config.version = packageConfig.package.version;
		config.name = packageConfig.package.name;
		callback(err, config);
	});
};

ConfigLoader.prototype.check = function(root) {
	return fs.existsSync(path.join(root, CONFIG_FILE));
};

exports.createLoader = function() {
	return new ConfigLoader();
};
