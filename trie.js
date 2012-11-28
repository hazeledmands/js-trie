(function(undefined) {

  var TrieNode = function(key) {
    this.key = key;
    this.children = {};
  };

  TrieNode.prototype.add = function(string, data) {
    var nextLetter = string[0];
    if(nextLetter === undefined) {
      this.data = data;
    }
    else {
      if(this.children[nextLetter] === undefined) {
        this.children[nextLetter] = new TrieNode(nextLetter);
      }
      this.children[nextLetter].add(string.substring(1), data);
    }
  };

  TrieNode.prototype.find = function(string) {
    var nextLetter = string[0];
    var nextNode = this.children[nextLetter];

    if(nextLetter === undefined) {
      return this;
    }
    else if(nextNode) {
      return nextNode.find(string.substring(1));
    }
  };

  TrieNode.prototype.subData = function() {
    var data = _.reduceRight(this.children, function(data, child) {
      return data.concat(child.subData());
    }, []);
    if(this.data) {
      data.push(this.data);
    }
    return data;
  };

  createTrie = function() {
    return new TrieNode();
  };
}());
