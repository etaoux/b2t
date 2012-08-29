function Project() {
	this.initialize();
}

Project.prototype.initialize = function() {
	this.name = '';
	this.version = '';
}

Project.fromConfig = function(members) {
	var project = new Project();
	Object.keys(members).forEach(function(name) {
		if (project[name] != undefined) {
			project[name] = members[name];
		}
	});
	return project
};

function load(root) {
	var loader = new require('./configloader').createLoader();
	var project = loader.load(root, Project);
	return project;
}

exports.load = load;
exports.Project = Project;
