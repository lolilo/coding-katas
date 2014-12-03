var Point = function(x, y){
	this.x = x;
	this.y = y;
	return this;
};

var magnetoEffect = {
	getStartVectorPoint: function(magneticPointList, mousePoint, radius) {
		// var closestMagneticPoint = magneticPointList[0];
		var closestMagneticPoint;
		for(i = 0; i < magneticPointList.length; i++) {

			var pointDistance = this.distance(magneticPointList[i], mousePoint);

			if (this.distance(closestMagneticPoint, mousePoint) > pointDistance) {
				closestMagneticPoint = magneticPointList[i];
			}
		};
		if (typeof(closestMagneticPoint) == "undefined") {
			closestMagneticPoint = mousePoint;
		}
		return closestMagneticPoint;
	},
	snap: function(magneticPoint, mousePoint, radius) {
		var point = mousePoint;
		if (this.distance(magneticPoint, mousePoint) <= radius) {
			point = magneticPoint;
		} 
		return point;
	}, 
	distance: function(point1, point2) {
		return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
	}
};

module.exports.magnetoEffect = magnetoEffect;
module.exports.Point = Point;
