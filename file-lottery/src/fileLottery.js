var fs = require('fs');

var fileLottery = function( directoryPath ) {
	var fileList = getFileListFromDirectoryPath( directoryPath );
	var number = randomNumberGenerator(0, fileList.length);
	return returnElementFromInputIndex(number,fileList);
}

var getFileListFromDirectoryPath = function( directoryPath ) {
	var blacklist = [".DS_Store"]; // change this to a hash for better efficiency
	var fileList = fs.readdirSync(directoryPath);
	var finalFileList = [];
	var fileListLength = fileList.length;
	for (var i = 0; i < fileListLength; i++) {
		var currentElement = fileList[i];
		if (!elementExistsInList(currentElement, blacklist)) {
			finalFileList.push(currentElement);
		}
	}
	return finalFileList;
}

var elementExistsInList = function(element, list) {
    for (var i = 0; i < list.length; i++){
        if (element == list[i]){
            return true;
        }
    }
    return false;
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
module.exports.elementExistsInList = elementExistsInList;

