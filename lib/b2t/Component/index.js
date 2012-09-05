var path = require('path');
var fs = require('fs');
var async = require('async');
var configloader = require('./configloader');
var mustache = require('mustache');
var Skin = require('../Skin');

const SKINS_DIR = 'skins';
const TEMPLATE_FILE = 'template.mustache';
const DEFAULT_DATA_FILE = 'default-data.json';

/**
 * 向上查找符合checker的路径
 */
function findPath(p, checker) {

	// normalize确保后面进行比较
	p = path.normalize(p);

	if (fs.existsSync(p) && fs.statSync(p).isFile()) {
		p = path.dirname(p);
	}

	var parentPath;

    while (true) {
		if (checker(p)) {
			return p;
		}
        parentPath = path.join(p, '../');
        if (parentPath == p) {
			break // 已经到根目录了，停止循环
		}
        else {
			p = parentPath;
		}
	}
}

function Component(root, callback) {
	this.initialize(root, callback);
}

Component.load = function(root, callback) {
	var loader = configloader.createLoader();
	var component = loader.load(root, Component, callback);
};

Component.find = function(root) {
	return findPath(root, function(p) {
		return fs.existsSync(path.join(p, 'component.json'));
	});
};

Component.fromConfig = function(root, members, callback) {
	var component = new Component(root);
	Object.keys(members).forEach(function(name) {
		if (component[name] != undefined) {
			component[name] = members[name];
		}
	});
	component.load(callback);
};

Object.defineProperties(Component.prototype, {
	'skinsRoot': {
		get: function() {
			return path.join(this.root, 'src', SKINS_DIR);
		}
	},
	'templateFile': {
		get: function() {
			return path.join(this.root, 'src', TEMPLATE_FILE);
		}
	},
	'defaultDataFile': {
		get: function() {
			return path.join(this.root, 'src', DEFAULT_DATA_FILE);
		}
	}
});

Component.prototype.initialize = function(root) {
	this.root = root;
	this.name = '';
	this.description = '';
	this.version = '';
};

Component.prototype.load = function(callback) {
	var component = this;
	async.auto({
		'template': function(callback) {
			fs.readFile(component.templateFile, 'utf-8', callback);
		},
		'defaultData': function(callback) {
			fs.readFile(component.defaultDataFile, 'utf-8', callback);
		},
	}, function(err, results) {
		component.template = results.template;
		component.defaultData = JSON.parse(results.defaultData);
		callback(err, component);
	});
};

Component.prototype.toHTML = function(data, callback) {
	try {
		var result = mustache.render(this.template, data);
		callback(null, result);
	} catch(e) {
		callback(e, result);
	}
};

Component.prototype.getSkins = function(callback) {
	var component = this;
	fs.readdir(this.skinsRoot, function(err, files) {
		async.map(files, component.getSkin.bind(component), function(err, results) {
			var skins = results;
			callback(err, skins);
		});
	});
};

Component.prototype.getSkin = function(name, callback) {
	var skinRoot = path.join(this.skinsRoot, name);
	Skin.load(skinRoot, callback);
};

module.exports = Component;
