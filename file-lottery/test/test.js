'use strict';

var assert = require('assert');
var sinon = require('sinon');
var path = require('path');

var fileLottery = require('../src/fileLottery.js').fileLottery;
var returnElementFromInputIndex = require('../src/fileLottery.js').returnElementFromInputIndex;
var randomNumberGenerator = require('../src/fileLottery.js').randomNumberGenerator;
var getFileListFromDirectoryPath = require('../src/fileLottery.js').getFileListFromDirectoryPath;

var DIRECTORY = ["file1", "file2"];

suite('fileLottery', function() {

  var mockRandomNumber = sinon.stub();
  mockRandomNumber.onFirstCall().returns(1);
  mockRandomNumber.onSecondCall().returns(2);

  test('takes in a directory and returns a random file from inside that directory', function() {

    var mockFileList = sinon.stub(getFileListFromDirectoryPath);
    mockFileList.withArgs('src/testfiles').returns(DIRECTORY);

    var result = fileLottery('src/testfiles');
    
    var expectedResult = "file1";
    assert.equal(expectedResult, result);

  });
});

suite('returnElementFromInputIndex', function() {
  var mockRandomNumber = sinon.stub();
  mockRandomNumber.onFirstCall().returns(0);
  mockRandomNumber.onSecondCall().returns(1);

  test('return element from input index', function() {
    var result = returnElementFromInputIndex(mockRandomNumber(), DIRECTORY);
    var expectedResult = "file1";
    assert.equal(expectedResult, result);

    var result = returnElementFromInputIndex(mockRandomNumber(), DIRECTORY);
    var expectedResult = "file2";
    assert.equal(expectedResult, result);
  })

});

suite('randomNumberGenerator', function() {

  test('return an integer in a specified range', function() {
    assert( randomNumberGenerator(1,10) <= 10 );
    assert( randomNumberGenerator(1,10) >= 1 );
  });

});


suite('getFileListFromDirectoryPath', function() {

  test('return a list of strings of files within given directory path', function() {
 
    var filePath = path.join(__dirname, "../src");
    assert.deepEqual(['fileLottery.js'], getFileListFromDirectoryPath(filePath));

  });

});


