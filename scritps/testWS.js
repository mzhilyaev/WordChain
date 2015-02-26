#!/usr/local/bin/node

var fs = require('fs');
var Getopt = require('node-getopt');
var LineStream = require('byline').LineStream;

var WordChain = require("../lib/WordChain");

function readWordsFile(file, cb) {
  var words = [];
  var lineStream = new LineStream();
  lineStream.on('data', function(line) {
    words.push(line.toString());
  });
  lineStream.on('end', function() {
    setTimeout(function() {
      cb(words);
    });
  });
  var fileStream = fs.createReadStream(file);
  fileStream.pipe(lineStream);
}

/*********** main section **********/
var getopts = new Getopt([
  ['h' , 'help',          'display this help'],
  ['v' , 'verbous',       'display debug info'],
])
.bindHelp()
.setHelp("USAGE: testWS.js [OPTIONS] startWord endWord wordListFile\n" +
         "finds a path from startWord to endWord in wordListFile\n\n\n" +
         "[[OPTIONS]]")
.parseSystem();

var startWord = getopts.argv[0];
var endWord = getopts.argv[1];
var wordListFile = getopts.argv[2];

readWordsFile(wordListFile, function(words) {
  var thePath = WordChain.findPath(startWord, endWord, words);
  console.log(">>> ", thePath);
});

