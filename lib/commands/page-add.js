exports.usage = "page <cmd>";

exports.options = {
	'-t, --test': 'test'
};

exports.action = function(cmd, options) {
	console.log(cmd, options)
};
