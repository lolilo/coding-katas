var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var FileLottery = require('../src/fileLottery.js').FileLottery;
var Logger = require('../src/fileLottery.js').Logger;

var fs = require('fs');
var pathModule = require('path');

var TEST_DIRECTORY_PATH = __dirname + "/testFileDirectory";
var TEST_DIRECTORY_FILES = [
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "5.txt"
   ];

var PRODUCTION_LOG_FILE = require('../src/fileLottery.js').LOG_FILE;
var TEST_LOG_FILE = pathModule.join(__dirname, 'log.txt');

suite('FileLottery.prototype.init', function() {
  test('Return list of file names for a path to a non-empty directory.', function() {
    var stubGetContentsOfDirectory = sinon.stub(FileLottery, 'getContentsOfDirectory');
    var stubShuffleArray = sinon.stub(FileLottery, 'shuffleArray');
    stubGetContentsOfDirectory.withArgs(TEST_DIRECTORY_PATH).returns(TEST_DIRECTORY_FILES);
    stubShuffleArray.withArgs(TEST_DIRECTORY_FILES).returns(TEST_DIRECTORY_FILES);

    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 
    expect(lottery.fileNames).to.equal(TEST_DIRECTORY_FILES);
    stubGetContentsOfDirectory.restore();
    stubShuffleArray.restore();
  });

  test('Return list with a single file name for a path to that file.', function() {
    var path = __dirname + '/../src/fileLottery.js';
    var lottery = new FileLottery(path);
    expect(lottery.fileNames).to.equal['fileLottery.js'];
  });
});

suite('FileLottery.prototype.FileLottery', function() {

  test('Return empty string for empty directory.', function() {
    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
    stub.withArgs(TEST_DIRECTORY_PATH).returns([]);
    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 

    expect(lottery.fileLottery()).to.equal('');
    stub.restore();
  });
    

  test('Return file name for directory with one file.', function() {
    var stub = sinon.stub(FileLottery, "getContentsOfDirectory");
    stub.withArgs(TEST_DIRECTORY_PATH).returns(['1.txt']);
    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 

    expect(lottery.fileLottery()).to.equal('1.txt');
    stub.restore();
  });

  test('Return \"random\" file names for directory with more than one files.', function() {
    var stubGetContentsOfDirectory = sinon.stub(FileLottery, 'getContentsOfDirectory');
    var stubShuffleArray = sinon.stub(FileLottery, 'shuffleArray');
    stubGetContentsOfDirectory.withArgs(TEST_DIRECTORY_PATH).returns(TEST_DIRECTORY_FILES);
    stubShuffleArray.withArgs(TEST_DIRECTORY_FILES).returns(TEST_DIRECTORY_FILES);

    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 

    expect(lottery.fileLottery()).to.equal('1.txt');
    expect(lottery.fileLottery()).to.equal('2.txt');
    expect(lottery.fileLottery()).to.equal('3.txt');
    stubGetContentsOfDirectory.restore();
    stubShuffleArray.restore();
  });

  test('For realsies.', function() {
    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 
    for (var i = 0; i < 10; i++){
      // console.log(lottery.fileLottery());
    }  
  }); 
});

suite('FileLottery.isElementInList', function() {
  test('Return true if element is in list.', function(){
    assert.equal(true, FileLottery.isElementInList("y", ["y", "a"]));
  }); 
  test('Return false if element is not in list.', function(){
    assert.equal(false, FileLottery.isElementInList("y", ["no", "a"]));
  });
});

suite('FileLottery.getContentsOfDirectory', function() {
  test('Return the content of the directory as an array of strings.', function(){
    expect(FileLottery.getContentsOfDirectory(TEST_DIRECTORY_PATH)).to.deep.equal(TEST_DIRECTORY_FILES);
  }); 
});

suite('FileLottery.getRandomNumber', function() {
  test('Return an integer between min and max.', function() {
    assert(FileLottery.getRandomNumber(1, 10) <= 10);
    assert(FileLottery.getRandomNumber(1, 10) >= 1);
  });
});

suite('FileLottery.shuffleArray', function() {
  test('Return a shuffled array.', function() {
    assert(FileLottery.shuffleArray([1, 2, 3, 4]).length == 4);
    assert(FileLottery.shuffleArray([]).length == 0);
  });
});

suite('FileLottery.prototype.next', function() {
  test('Return next file name for a non-empty fileList.', function() {
    var stubGetContentsOfDirectory = sinon.stub(FileLottery, 'getContentsOfDirectory');
    var stubShuffleArray = sinon.stub(FileLottery, 'shuffleArray');
    stubGetContentsOfDirectory.withArgs(TEST_DIRECTORY_PATH).returns(TEST_DIRECTORY_FILES);
    stubShuffleArray.withArgs(TEST_DIRECTORY_FILES).returns(TEST_DIRECTORY_FILES);

    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 

    expect(lottery.fileLottery()).to.equal('1.txt');
    expect(lottery.fileLottery()).to.equal('2.txt');
    expect(lottery.fileLottery()).to.equal('3.txt');
    expect(lottery.fileLottery()).to.equal('4.txt');
    expect(lottery.fileLottery()).to.equal('5.txt');
    stubGetContentsOfDirectory.restore();
    stubShuffleArray.restore();
  });

  test('Cycle through file names once array is exhausted.', function() {
    var stubGetContentsOfDirectory = sinon.stub(FileLottery, 'getContentsOfDirectory');
    var stubShuffleArray = sinon.stub(FileLottery, 'shuffleArray');
    stubGetContentsOfDirectory.withArgs(TEST_DIRECTORY_PATH).returns(TEST_DIRECTORY_FILES);
    stubShuffleArray.withArgs(TEST_DIRECTORY_FILES).returns(TEST_DIRECTORY_FILES);

    var lottery = new FileLottery(TEST_DIRECTORY_PATH); 

    expect(lottery.fileLottery()).to.equal('1.txt');
    expect(lottery.fileLottery()).to.equal('2.txt');
    expect(lottery.fileLottery()).to.equal('3.txt');
    expect(lottery.fileLottery()).to.equal('4.txt');
    expect(lottery.fileLottery()).to.equal('5.txt');
    expect(lottery.fileLottery()).to.equal('1.txt');
    expect(lottery.fileLottery()).to.equal('2.txt');
    expect(lottery.fileLottery()).to.equal('3.txt');
    expect(lottery.fileLottery()).to.equal('4.txt');
    expect(lottery.fileLottery()).to.equal('5.txt');
    expect(lottery.fileLottery()).to.equal('1.txt');
    expect(lottery.fileLottery()).to.equal('2.txt');
    expect(lottery.fileLottery()).to.equal('3.txt');
    expect(lottery.fileLottery()).to.equal('4.txt');
    expect(lottery.fileLottery()).to.equal('5.txt');
    stubGetContentsOfDirectory.restore();
    stubShuffleArray.restore();
  });
});

describe('Logger.add', function() {
  beforeEach(function() {
    TEST_STRING = 'some string';
    logger = new Logger(TEST_LOG_FILE);
  });

  afterEach(function() {
    fs.unlinkSync(TEST_LOG_FILE);
  });

  it('should add an input string to an existing .txt file', function() {
    var fd = fs.openSync(TEST_LOG_FILE, 'wx');
    fs.closeSync(fd);
    logger.add(TEST_STRING);
    fileContents = fs.readFileSync(TEST_LOG_FILE, 'utf8');
    expect(fileContents.trim()).to.equal(TEST_STRING);
  });

  it('should log input string to a new TEST_LOG_FILE file if TEST_LOG_FILE does not exist', function() {
    logger.add(TEST_STRING);
    fileContents = fs.readFileSync(TEST_LOG_FILE, 'utf8');
    expect(fileContents.trim()).to.equal(TEST_STRING);
  });

});

describe('FileLottery logs with setup and teardown.', function() {
  beforeEach(function() {
    loggerSpy = sinon.spy(Logger.prototype, 'add');

    stubGetContentsOfDirectory = sinon.stub(FileLottery, 'getContentsOfDirectory');
    stubShuffleArray = sinon.stub(FileLottery, 'shuffleArray');
    stubGetContentsOfDirectory.withArgs(TEST_DIRECTORY_PATH).returns(TEST_DIRECTORY_FILES);
    stubShuffleArray.withArgs(TEST_DIRECTORY_FILES).returns(TEST_DIRECTORY_FILES);
    lottery = new FileLottery(TEST_DIRECTORY_PATH); 
  });

  afterEach(function() {
    stubGetContentsOfDirectory.restore();
    stubShuffleArray.restore();
    loggerSpy.restore();
    fs.unlinkSync(PRODUCTION_LOG_FILE);
  });

  it('should log once upon initialization', function() {
    assert(loggerSpy.calledOnce);
  });

  it('should once more when returning a random file', function() {
    lottery.nextFile();
    assert(loggerSpy.calledTwice);
  });

});

