var path = require('path');
var fs = require('fs');
var async = require('async');
var util = require('../../util');
var loader = require('./configloader').createLoader();
var Page = require('../Page');
var Component = require('../Component');

const PAGES_DIR = 'pages';
const COMPONENTS_DIR = 'components';

function Project(root, options) {
	this.initialize(root, options);
}

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

/**
 * 当前项目的所有自有组件
 */
Project.prototype.getComponents = function(callback) {
	var project = this;
	var files = fs.readdirSync(this.componentsRoot);
	var components = [];
	async.forEach(files, function(file, callback) {
		var filename = path.join(project.componentsRoot, file);
		if (Component.check(filename)) {
			project.getComponent(file, function(err, component) {
				components.push(component);
				callback();
			});
		} else {
			// pass
			callback();
		}
	}, function(err) {
		callback(err, components);
	});
};

Project.prototype.getComponent = function(file, callback) {
	var filename = path.join(this.componentsRoot, file);
	if (Component.check(filename)) {
		Component.load(filename, callback);
	} else {
		callback(new Error('not a component.'));
	}
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
			callback(err, new Page(filename));
		} else {
			callback(new Error('not a page.'));
		}
	});
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

Project.load = function(root, callback) {
	loader.load(root, function(err, options) {
		var project = new Project(root, options);
		callback(err, project);
	});
};

Project.find = function(root) {
	return util.findPath(root, function(p) {
		return fs.existsSync(path.join(p, 'project.json'));
	});
};

module.exports = Project;
