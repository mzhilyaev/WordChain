'use strict';
var should = require('should');
var when = require("when");
var WordChain = require('../lib/WordChain');

describe('test WordChain', function(){

  it('test isConnected', function(done) {

    var matchTests = [
      {a: "a", b: "b", expected: true},
      {a: "aa", b: "a", expected: true},
      {a: "aa", b: "aa", expected: false},
      {a: "abc", b: "bac", expected: false},
      {a: "abd", b: "aed", expected: true},
      {a: "", b: "a", expected: true},
      // strings of different length
      {a: "abc", b: "bc", expected: true},
      {a: "abc", b: "ab", expected: true},
      {a: "abc", b: "bc", expected: true},
      {a: "abcd", b: "bc", expected: false},
    ];
    matchTests.forEach(function(test) {
      var res = WordChain.isConnected(test.a, test.b);
      should(res).eql(test.expected);
    });
    done();
  });

  it("test findPath", function(done) {
    var matchTests = [
      {
        start: "a",
        end: "db",
        words: ["a" , "d" , "db"],
        expected: ["a", "d" , "db"],
      },
      {
        start: "a",
        end: "db",
        words: ["d" , "db", "a"],
        expected: ["a", "d" , "db"],
      },
      {
        start: "foo",
        end: "bar",
        words: ["foo", "f" , "fo", "fa", "ba", "bar", "bxx", "ofx"],
        expected: ["foo", "fo", "fa", "ba", "bar"],
      },
      {
        start: "foo",
        end: "bar",
        words: ["foo", "f" , "fo", "fa", "baxr", "bxx", "ofx"],
        expected: [],
      },
    ];
    matchTests.forEach(function(test) {
      var res = WordChain.findPath(test.start, test.end, test.words);
      should(res).eql(test.expected);
      // but then testing backwords should also work
      res = WordChain.findPath(test.end, test.start, test.words);
      should(res).eql(test.expected.reverse());
    });
    done();
  });

});
