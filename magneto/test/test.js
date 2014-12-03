'use strict';

var assert = require('assert');

var magnetoEffect = require('../src/magneto.js').magnetoEffect;
var Point = require('../src/magneto.js').Point;

suite('magnetoEffect', function() {

  test('one magnetic point; mouse clicks close enough to attach to it', function() {
  		var magneticPoint = new Point(50, 50);
  		var mousePoint = new Point(49, 50);
  		var effectRadius = 5;
  		var expectedResult = new Point(50, 50);
  		assert.deepEqual(expectedResult, magnetoEffect.snap(magneticPoint, mousePoint, effectRadius));
  });

  test('one magnetic point; mouse clicks outside of effectRadius', function() {
  		var magneticPoint = new Point(50, 50);
  		var mousePoint = new Point(0, 0);
  		var effectRadius = 5;
  		var expectedResult = new Point(0, 0);
  		assert.deepEqual(expectedResult, magnetoEffect.snap(magneticPoint, mousePoint, effectRadius));

  });

  test('distance', function(){
		var point1 = new Point(0, 0);
  		var point2 = new Point(1, 1);
  		var result = magnetoEffect.distance(point1, point2);
  		assert.equal(Math.sqrt(2), result);

  });

  test('find the closest magnetic point', function(){
  	var magneticPoint1 = new Point(50, 50);
  	var magneticPoint2 = new Point(100, 50);
  	var magneticPointList = [magneticPoint1, magneticPoint2];
  	var mousePoint = new Point(101, 48);
  	var expectedPoint = new Point(100, 50);
  	var effectRadius = 5;

  	assert.deepEqual(expectedPoint, magnetoEffect.getStartVectorPoint(magneticPointList, mousePoint, effectRadius));

  });  

  test('find the closest magnetic point2', function(){
  	var magneticPoint1 = new Point(50, 50);
  	var magneticPoint2 = new Point(51, 51);
  	var magneticPoint3 = new Point(49, 49);
  	var magneticPointList = [magneticPoint1, magneticPoint2, magneticPoint3];
  	var mousePoint = new Point(51, 52);
  	var expectedPoint = new Point(51, 51);
  	var effectRadius = 5;

  	assert.deepEqual(expectedPoint, magnetoEffect.getStartVectorPoint(magneticPointList, mousePoint, effectRadius));

  });  

  test('do not return a magnetic point if there is not within radius', function(){
	var magneticPoint1 = new Point(50, 50);
  	var magneticPoint2 = new Point(51, 51);
  	var magneticPoint3 = new Point(49, 49);
  	var magneticPointList = [magneticPoint1, magneticPoint2, magneticPoint3];
  	var mousePoint = new Point(0, 0);
  	var effectRadius = 5;

  	assert.deepEqual(mousePoint, magnetoEffect.getStartVectorPoint(magneticPointList, mousePoint, effectRadius));


  });

});

suite('Point class', function () {
	test('Point class has x and y attributes.', function(){
		var point = new Point(10, 20);
		assert.equal(point.x, 10);
		assert.equal(point.y, 20);

		var point2 = new Point(20, 30);
		assert.equal(point2.x, 20);
		assert.equal(point2.y, 30);
	});
})


// suite('Canvas class', function () {
// 	test('Canvas class interfaces', function(){
// 		var canvas = new Canvas(magneticPointList);
// 		canvas.radius = 5;

// 		var result = canvas.snap(mousePoint);
//   		var expectedResult = new Point(50, 50);

// 		assert.deepEqual(expectedResult, result);
// 	});
// })
