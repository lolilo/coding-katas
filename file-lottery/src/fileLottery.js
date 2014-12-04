var fs = require('fs');

var FileLottery = function() {
	// this.index = 0;
	this.fileList = [];
};

// FileLottery.prototype = {
// 	next: function() {
// 		return this.fileList[fileList.index++];
// 	}
// }

FileLottery.prototype.fileLottery = function( directoryPath ) {
	this.fileList = this.getFileListFromDirectoryPath(directoryPath);
	var number = randomNumberGenerator(0, this.fileList.length - 1);
	return this.returnElementFromInputIndex(number, this.fileList);
}

FileLottery.prototype.getFileListFromDirectoryPath = function( directoryPath ) {
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

FileLottery.prototype.returnElementFromInputIndex = function(num, iterable) {
	var it = new Iterator(iterable);
	var currentElement;
	for (var i = 0; i < it.items.length; i++) {
		currentElement = it.next();
		if ( i == num ) {
			return currentElement;
		}
	}
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

var elementExistsInList = function(element, list) {
    for (var i = 0; i < list.length; i++){
        if (element == list[i]){
            return true;
        }
    }
    return false;
}

var randomNumberGenerator = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// module.exports.returnElementFromInputIndex = returnElementFromInputIndex;
module.exports.randomNumberGenerator = randomNumberGenerator;
module.exports.elementExistsInList = elementExistsInList;
module.exports.FileLottery = FileLottery;

