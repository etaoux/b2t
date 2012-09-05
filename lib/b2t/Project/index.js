var path = require('path');
var fs = require('fs');
var async = require('async');
var configloader = require('./configloader');
var Page = require('../Page');

const PAGES_DIR = 'pages';

function Project(root) {
	this.initialize(root);
}

Project.load = function(root) {
	var loader = configloader.createLoader();
	var project = loader.load(root, Project);
	return project;
};

Object.defineProperties(Project.prototype, {
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
}

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
			var page = Page.load(filename);
			callback(null, page);
		} else {
			callback(new Error('not a page.'));
		}
	});
};

Project.fromConfig = function(root, members) {
	var project = new Project(root);
	Object.keys(members).forEach(function(name) {
		if (project[name] != undefined) {
			project[name] = members[name];
		}
	});
	return project
};

module.exports = Project;
