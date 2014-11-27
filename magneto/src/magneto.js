
var magnetoEffect = { 
	snap: function(magneticPoint, mousePoint, radius) {

		var retrunedPoint = new Point(50, 50);

		return retrunedPoint;
	}, 
	distance: function(point1, point2) {
		return Math.sqrt(Math.pow(point1.x-point2.x, 2) + Math.pow(point1.y - point2.y, 2));
	}
};

var Point = function(x, y){
	this.x = x;
	this.y = y;

	return this;
};

module.exports.magnetoEffect = magnetoEffect;
module.exports.Point = Point;
