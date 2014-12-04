'use strict';

var assert = require('assert');
var sinon = require('sinon');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;

// var returnElementFromInputIndex = require('../src/fileLottery.js').returnElementFromInputIndex;
var randomNumberGenerator = require('../src/fileLottery.js').randomNumberGenerator;
var elementExistsInList = require('../src/fileLottery.js').elementExistsInList;
var FileLottery = require('../src/fileLottery.js').FileLottery;


var FILE_LIST = ["file1", "file2"];

suite('FileLottery Object', function() {
  var lottery = new FileLottery();
})

suite('fileLottery', function() {
  test('takes in a directory and returns a random file from inside that directory', function() {

    var lottery = new FileLottery();
    var mockFileList = sinon.stub(lottery, 'getFileListFromDirectoryPath');
    mockFileList.withArgs('src/testfiles').returns(FILE_LIST);
        
    var result = lottery.fileLottery('src/testfiles');
    expect(result).to.be.a('string');
  });
});

suite('returnElementFromInputIndex', function() {
  var mockRandomNumber = sinon.stub();
  mockRandomNumber.onFirstCall().returns(0);
  mockRandomNumber.onSecondCall().returns(1);

  var lottery = new FileLottery();

  test('return element from input index', function() {
    var result = lottery.returnElementFromInputIndex(mockRandomNumber(), FILE_LIST);
    var expectedResult = "file1";
    assert.equal(expectedResult, result);

    var result = lottery.returnElementFromInputIndex(mockRandomNumber(), FILE_LIST);
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
    var lottery = new FileLottery();
    assert.deepEqual(['fileLottery.js'], lottery.getFileListFromDirectoryPath(filePath));

  });

});

suite('elementExistsInList', function() {
  test('return a boolean indicating whether the element exists in the list', function() {
    assert.equal(true, elementExistsInList("yo", ["yo"]))
  });

});

