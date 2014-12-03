var fs = require('fs');

var fileLottery = function( directoryPath ) {
	var fileList = getFileListFromDirectoryPath( directoryPath );
	var number = randomNumberGenerator(0,fileList.length);
	return returnElementFromInputIndex(number,fileList);
}

var getFileListFromDirectoryPath = function( directoryPath ) {
	return fs.readdirSync(directoryPath);
}

var Iterator = function(items) {
	this.index = 0;
	this.items = items;
}

Iterator.prototype  = {
	next: function() {
		return this.items[this.index++];
	}
}

// console.log(Iterator.new());

var returnElementFromInputIndex = function(num, iterable) {
	var it = new Iterator(iterable);
	var currentElement;
	for (var i = 0; i<it.items.length; i++) {
		currentElement = it.next();
		if ( i == num ) {
			return currentElement;
		}
	}
}

var randomNumberGenerator = function( min, max ) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.fileLottery = fileLottery;
module.exports.returnElementFromInputIndex = returnElementFromInputIndex;
module.exports.randomNumberGenerator = randomNumberGenerator;
module.exports.getFileListFromDirectoryPath = getFileListFromDirectoryPath;

