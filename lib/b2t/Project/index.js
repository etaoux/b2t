var path = require('path');
var fs = require('fs');
var async = require('async');
var util = require('../../util');
var configloader = require('./configloader');
var Page = require('../Page');
var Component = require('../Component');

const PAGES_DIR = 'pages';
const COMPONENTS_DIR = 'components';

function Project(root, options) {
	this.initialize(root, options);
}

Object.defineProperties(Project.prototype, {
	'componentsRoot': {
		get: function() {
			return path.join(this.root, COMPONENTS_DIR);
		}
	},
	'pagesRoot': {
		get: function() {
			return path.join(this.root, 'src', PAGES_DIR);
		}
	}
});

Project.prototype.initialize = function(root, options) {
	this.name = '';
	this.version = '';

	Object.keys(options || {}).forEach(function(name) {
		if (this.hasOwnProperty(name) != undefined) {
			this[name] = options[name];
		}
	}, this);

	this.root = root;
};

Project.prototype.getComponents = function(callback) {
	var project = this;
	fs.readdir(this.componentsRoot, function(err, files) {
		async.filter(files, function(file, callback) {
			fs.exists(path.join(this.componentsRoot, file), callback);
		}, function(files) {
			async.map(files, project.getComponent.bind(project), function(err, results) {
				var components = results;
				callback(err, components);
			});
		});
	});
};

Project.prototype.getComponent = function(file, callback) {
	var filename = path.join(this.componentsRoot, file);
	var component;
	fs.stat(filename, function(err, stat) {
		if (stat.isDirectory()) {
			callback(err, Component.load(filename));
		} else {
			callback(new Error('not a component.'));
		}
	});
};

/**
 * 获取此项目所有page
 */
Project.prototype.getPages = function(callback) {
	var project = this;
	fs.readdir(this.pagesRoot, function(err, files) {
		async.map(files, project.getPage.bind(project), function(err, results) {
			var pages = results;
			callback(err, pages);
		});
	});
};

Project.prototype.getPage = function(file, callback) {
	var filename = path.join(this.pagesRoot, file);
	fs.stat(filename, function(err, stat) {
		if (stat.isDirectory()) {
			callback(err, Page.load(filename));
		} else {
			callback(new Error('not a page.'));
		}
	});
};

Project.load = function(root) {
	var loader = configloader.createLoader();
	var project = loader.load(root, Project);
	return project;
};

Project.find = function(root) {
	return util.findPath(root, function(p) {
		return fs.existsSync(path.join(p, 'project.json'));
	});
};

module.exports = Project;
