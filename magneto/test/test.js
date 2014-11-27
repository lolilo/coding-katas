var assert = require("assert");
var getBeginDrawPoint = require('../src/magneto.js').getBeginDrawPoint;
var detectClosestMagneticPoint = require('../src/magneto.js').detectClosestMagneticPoint;

suite('getBeginDrawPoint', function() {
	test('one magnetic point; drawn to point', function() {
		var mousePoint = (49, 50);
		var magneticPoint = (50, 50);
		var effectRadius = 5;
		assert.deepEqual((50, 50), getBeginDrawPoint(mousePoint, magneticPoint, effectRadius));
	});

	test('one magnetic point; too far from point', function() {
		var mousePoint = (0, 0);
		var magneticPoint = (50, 50);
		var effectRadius = 5;
		assert.deepEqual((0, 0), getBeginDrawPoint(mousePoint, magneticPoint, effectRadius));
	});
});

suite('detectClosestMagneticPoint', function() {
	test('two magnetic points; mouse drawn to closest point', function() {
		var mousePoint = (101, 48);
		var magneticPoints = [(50, 50), (100, 50)];
		var effectRadius = 5;
		assert.deepEqual((100, 50), detectClosestMagneticPoint(mousePoint, magneticPoints, effectRadius));
	});

	test('two magnetic points; mouse drawn to closest point', function() {
		var mousePoint = (51, 52);
		var magneticPoints = [(50, 50), (51, 51)];
		var effectRadius = 5;
		assert.deepEqual((51, 51), detectClosestMagneticPoint(mousePoint, magneticPoints, effectRadius));
	});
})
