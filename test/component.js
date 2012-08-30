var assert = require('assert');
var path = require('path');
var Component = require('../lib/b2t/Component');

var componentRoot = path.join(__dirname, '../demo/package/node_modules/header');

describe('component base', function() {
	it('members', function(done) {
		Component.load(componentRoot, function(err, component) {
			assert.equal(component.root, componentRoot);
			assert.equal(component.name, 'b2t_demo_header');
			assert.equal(component.version, '0.0.1');
			done();
		});
	});
});

describe('component skin', function() {
	Component.load(componentRoot, function(err, component) {
		it('skin', function(done) {
			component.getSkin('default', function(err, skin) {
				assert.equal(skin.sizes, 1);
				done();
			});
		});
		it('toCSS', function(done) {
			component.getSkin('default', function(err, skin) {
				skin.toCSS(function(err, css) {
					console.log(css);
				});
				done();
			});
		});
	});
});

describe('component template', function() {
	Component.load(componentRoot, function(err, component) {
		it('template', function(done) {
			assert.equal(!!component.template, true);
			done();
		});
		it('toHTML', function(done) {
			component.toHTML({title: 'title'}, function(err, result) {
				done();
			});
		});
	});
});

