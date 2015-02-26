var WordChain = {

  // checks if two words have 1 char edit distance
  isConnected: function(a, b) {
    var lenA = a.length;
    var lenB = b.length;
    // if length difference above 1 - words not connected
    if (Math.abs(lenA - lenB) > 1) return false;

    // if words have same length, they should have exactly one char mismatch
    if (lenA == lenB) {
      var aSplit = a.split("");
      var bSplit = b.split("");
      var mismatched = 0;
      for (var i in aSplit) {
        if (aSplit[i] != bSplit[i]) {
          mismatched++;
          // return early if mismatched exceeds 1
          if (mismatched > 1) return false;
        }
      }
      return (mismatched == 1);
    }
    else {
      // we have a situation when one string is a char less than other
      // in which case chopp a character in front or back of the 
      // longest string and compare to the shortest, if match happens
      // return true, false otherwise
      var shortStr = (lenA < lenB) ? a : b;
      var longStr = (lenA < lenB) ? b : a;

      if (longStr.slice(1) == shortStr) return true;
      if (longStr.slice(0,-1) == shortStr) return true;
    }
    return false;
  },

  // finds a patch between words a and b in a wordList
  findPath: function(startWord, endWord, theWordList) {
    // suppose that we have a set of words already
    // connected to startWord, and the set of words 
    // whcih connectioni status we do not know.
    // Given a word from connected set, we only need 
    // compute connections to words outside connected set
    // and append newly found connected words to the connected set
    // Hence we process connected set word by word enlarging it
    // with new connected words at every iteration.
    // We stop when 
    // - path is found
    // - no more connected words can be added to connected set

    // populate connected set with startWord
    var connectedSet = [{word: startWord, path: [startWord]}];

    // duplicate theWordList since we are going to modify it
    var wordList = theWordList.slice();

    while (connectedSet.length > 0) {
      // pick a word from connected set
      var node = connectedSet.shift();

      // walk over wordList and collected connected words
      // moving them from wordList to connectedSet
      for (var i = 0; i < wordList.length; i++) {
        if (this.isConnected(node.word, wordList[i])) {
          var newPath = node.path.concat(wordList[i]);
          // did we find the path?
          if (wordList[i] == endWord) return newPath;

          // otherwise, place new word into connected set
          connectedSet.push({word: wordList[i], path: newPath});
          // remove it from wordList
          wordList.splice(i,1);
          // move index back to pick word following removed
          i--;
        }
        // remove duplicates
        else if (node.word == wordList[i]) {
          wordList.splice(i,1);
          // move index back to pick word following removed
          i--;
        }
      }
      // done with iteration, do it for the next word
    }

    // if we are here - no path exists
    return [];
  },

};

module.exports = WordChain;
