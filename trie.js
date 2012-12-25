// trie.js
// A javascript trie data structure.
//
// Copyright (c) 2012 Max Edmands. MIT license:
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.


(function (root, factory) {

  // Use AMD/CommonJS if we can, otherwise this library
  // just populates a global variable called "trie."

  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.trie = factory();
  }

}(this, function () {

  // We're paranoid, so we redefine undefined.
  var undefined; 

  // Everything comes from a node.
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

  TrieNode.prototype.get = function(string) {
    return this._subtree(string).data;
  };

  TrieNode.prototype.getAllMatchingKeysAndValues = function(string) {
    return this._subtree(string)._subdata();
  };

  TrieNode.prototype._subtree = function(string) {
    var nextLetter = string[0];
    var nextNode = this.children[nextLetter];

    if(nextLetter === undefined) {
      return this;
    } else if(nextNode) {
      return nextNode._subtree(string.substring(1));
    } else {
      return {};
    }
  };

  TrieNode.prototype._subdata = function() {
    var prefix, child, childsubdata, key;
    var out = {};
    
    for(prefix in this.children) {
      child = this.children[prefix];

      if(child.data !== undefined) {
        out[prefix] = child.data;
      }

      childsubdata = child._subdata();
      for(key in childsubdata) {
        out[prefix + key] = childsubdata[key];
      }
    }

    return out;
  };

  return function() {
    return new TrieNode();
  };

}));
