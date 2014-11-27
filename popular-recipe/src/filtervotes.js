var fileSystem = require('fs');
var path = require('path');

var FILE_PATH = path.join(__dirname, '../testlog.txt');

var finalAnswer = filtervotes(FILE_PATH);

console.log(finalAnswer);
function filtervotes(filePath) {
	voteLogArray = parseStringIntoArray(readFile(filePath))
	return calculateScoreForEachRecipe(voteLogArray);
}

function readFile(filePath) {
    return fileSystem.readFileSync(filePath).toString();
}

function parseStringIntoArray(inputString) {
    return inputString.split("\n");
}


function calculateScoreForEachRecipe(logArray) {
	var scoreList = []; 
	var logArrayLength = logArray.length;
	for (var i = 0; i < logArrayLength; i++) {
		var element = logArray[i];
		if (!isNaN(element)) {
			var logArraySlice = logArray.slice(i + 1, i + Number(element) + 1);
			scoreList.push(countVotesForOneRecipe(logArraySlice));
			// new recipe detected
			// count score
			// append score to list
		} else {
			// element is a name, so just move on
			continue;
		}
	}
	return scoreList;
}

function countVotesForOneRecipe(logArray) {
	var set = {
	    elements: [],
	    add: function(item){
	        if (this.has(item)){
	            // console.log("Item is already in set.");
	        } else {
	            // console.log("Item added to set.");
	            this.elements.push(item);
	        }
	    },
	    has: function(item){
	        for (var i = 0; i < this.elements.length; i++){
	            if (item == this.elements[i]){
	                return true;
	            }
	        }
	        return false;
	    }
	};

	var totalVotes = 0;
	var logArrayLength = logArray.length;
	for (var i = logArrayLength - 1; i >= 0; i--) {
		var element = logArray[i];
		var name = element.slice(0, element.length - 1);
		var vote = element.slice(-1);

		if (!set.has(name)) {
			set.add(name);
			totalVotes += parseVoteSymbol(vote);
		}
	}
	return totalVotes;
}

function parseVoteSymbol(vote) {
	if (vote == "+") {
		return 1;
	} else {
		return -1;
	}
}

// find number

// function - go ahead in list by number and log the most recent vote of each person
// use hash to keep track

// loop

// collect results into an array
// return array

module.exports.filtervotes = filtervotes;
module.exports.readFile = readFile;
module.exports.parseStringIntoArray = parseStringIntoArray;
module.exports.parseVoteSymbol = parseVoteSymbol;
module.exports.countVotesForOneRecipe = countVotesForOneRecipe;
module.exports.calculateScoreForEachRecipe = calculateScoreForEachRecipe;
