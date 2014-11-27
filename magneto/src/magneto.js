// takes in a tuple and a list of tuples and an effectRadius
// returns tuple representing closest magnetic point to mouse position

function getBeginDrawPoint(mousePosition, magneticPointPosition, effectRadius) {
	var mouseDistanceFromMagneticPoint = Math.sqrt(Math.pow(mousePosition[0] - magneticPointPosition[0], 2) /
											 + Math.pow(mousePosition[1] - magneticPointPosition[1], 2));
	if (mouseDistanceFromMagneticPoint < effectRadius) {
		return magneticPointPosition;
	} else {
		return mousePosition;
	}
}

function detectClosestMagneticPoint(mousePosition, magneticPointPosition, effectRadius) {

}

module.exports.detectClosestMagneticPoint = detectClosestMagneticPoint;
module.exports.getBeginDrawPoint = getBeginDrawPoint;
