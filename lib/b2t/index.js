var path = require('path');
var os = require('os');
var nconf = require('nconf');

function Program() {
	var platform = os.platform();
	// TODO 兼容linux/macos，比win32多一个global配置，放在/etc/b2t/b2trc
	if (platform == 'win32') {
		this.config = nconf.env().add('user', {
			type: 'file',
			file: path.join(process.env['HOME'] || process.env['USERPROFILE'], '.b2trc'),
			format: nconf.formats.ini
		}).add('default', {
			type: 'file',
			file: path.join(__dirname, '../../b2trc'),
			format: nconf.formats.ini
		});
	} else if (platform == 'darwin') {
		this.config = nconf.env().add('user', {
			type: 'file',
			file: path.join(process.env['HOME'] || process.env['USERPROFILE'], '.b2trc'),
			format: nconf.formats.ini
		}).add('global', {
			type: 'file',
			file: '/etc/b2t/b2trc',
			format: nconf.formats.ini
		}).add('default', {
			type: 'file',
			file: path.join(__dirname, '../../b2trc'),
			format: nconf.formats.ini
		});
	}

	this.loadExtensions();
}

Program.prototype.loadExtensions = function() {
	var extensions = this.extensions = this.config.get('extensions');
	Object.keys(extensions || {}).forEach(function(name) {
		// ini 中 "xxx"，值为 true
		// ini 中 "xxx ="，值为空字符
		if (!extensions[name] || extensions[name] == true) {
			extensions[name] = path.join(__dirname, '../extensions/' + name);
		}
	}, this);
};

module.exports = new Program();
