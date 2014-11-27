var assert = require("assert");
var filtervotes = require('../src/filtervotes.js').filtervotes;
var readFile = require('../src/filtervotes.js').readFile;
var parseStringIntoArray = require('../src/filtervotes.js').parseStringIntoArray;
var parseVoteSymbol = require('../src/filtervotes.js').parseVoteSymbol;
var countVotesForOneRecipe = require('../src/filtervotes.js').countVotesForOneRecipe;
var calculateScoreForEachRecipe = require('../src/filtervotes.js').calculateScoreForEachRecipe;

suite('readFile', function() {
	test('read file into a string', function() {
		var inputString ="4\ntilak +\ntilak +\ntilak -\ntilak +\n3\nratna +\nshashi -\nratna -\n3\nbhavani -\nbhavani +\nbhavani -";
		assert.deepEqual(inputString, readFile('./testlog.txt'));
	});
});

suite('parseStringIntoArray', function() {
    test('parse string by newline separators', function() {
        assert.deepEqual(['1','32','456'], parseStringIntoArray("1\n32\n456"));
    });
});

suite('calculateScoreForEachRecipe', function() {

	var scoreList = [ '4',
					  'tilak +',
					  'tilak +',
					  'tilak -',
					  'tilak +',
					  '3',
					  'ratna +',
					  'shashi -',
					  'ratna -',
					  '3',
					  'bhavani -',
					  'bhavani +',
					  'bhavani -' ]

	test('array should only tally most recent vote', function(){
		assert.deepEqual([1, -2, -1], calculateScoreForEachRecipe(scoreList));
	});	
})

suite('countVotesForOneRecipe', function() {
	test('array should only tally most recent vote', function(){
		assert.equal(1, countVotesForOneRecipe(['tilak +', 'tilak +', 'tilak -', 'tilak +']));
	});	
	test('array should only tally most recent vote', function(){
		assert.equal(-2, countVotesForOneRecipe(['tilak +', 'tilak +', 'tilak -', 'yoyo -']));
	});	
})

suite('parseVoteSymbol', function() {
	test('+', function(){
		assert.equal(1, parseVoteSymbol("+"));
	});	
	test('-', function(){
		assert.equal(-1, parseVoteSymbol("-"));
	});	
})
