var path = require('path');
var fs = require('fs');
var async = require('async');
var util = require('../../util');
var configloader = require('./configloader');
var Page = require('../Page');
var Component = require('../Component');

const PAGES_DIR = 'pages';
const COMPONENTS_DIR = 'components';

function Project(root) {
	this.initialize(root);
}

Project.load = function(root, callback) {
	var loader = configloader.createLoader();
	loader.load(root, Project, callback);
};

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

Project.prototype.initialize = function(root) {
	this.root = root;
	this.name = '';
	this.version = '';
};

Project.prototype.load = function(callback) {
	callback(null, this);
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
	fs.stat(filename, function(err, stat) {
		if (stat.isDirectory()) {
			Component.load(filename, callback);
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
			Page.load(filename, callback);
		} else {
			callback(new Error('not a page.'));
		}
	});
};

Project.find = function(root) {
	return util.findPath(root, function(p) {
		return fs.existsSync(path.join(p, 'project.json'));
	});
};

Project.fromConfig = function(root, members, callback) {
	var project = new Project(root);
	Object.keys(members).forEach(function(name) {
		if (project[name] != undefined) {
			project[name] = members[name];
		}
	});
	project.load(callback);
};

module.exports = Project;
