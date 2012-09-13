var path = require('path');
var fs = require('fs');
var async = require('async');
var configloader = require('./configloader');
var mustache = require('mustache');
var util = require('../../util');
var Skin = require('../Skin');

const SKINS_DIR = 'skins';
const TEMPLATE_FILE = 'template.mustache';
const DEFAULT_DATA_FILE = 'default-data.json';

function Component(root, options) {
	this.initialize(root, options);
}

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

Component.prototype.initialize = function(root, options) {
	this.name = '';
	this.description = '';
	this.version = '';

	Object.keys(options || {}).forEach(function(name) {
		if (this.hasOwnProperty(name)) {
			this[name] = options[name];
		}
	}, this);

	this.root = root;
	if (fs.existsSync(this.templateFile)) {
		this.template = fs.readFileSync(this.templateFile, 'utf-8');
	}
	if (fs.existsSync(this.defaultDataFile)) {
		this.defaultData = JSON.parse(fs.readFileSync(this.defaultDataFile, 'utf-8'));
	}
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
	var skin = new Skin(skinRoot);
	callback(null, skin);
};

Component.load = function(root) {
	var loader = configloader.createLoader();
	var component = loader.load(root, Component);
	return component;
};

Component.find = function(root) {
	return util.findPath(root, function(p) {
		return fs.existsSync(path.join(p, 'component.json'));
	});
};

module.exports = Component;
