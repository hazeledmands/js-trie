var trie = require("./trie");
var assert = require("assert");

describe("Trie", function() {

  describe('#add()', function() {
    it('should let you add entries', function() {
      var t = trie();
      t.add('one', 'data');
    });
  });

  describe('#get()', function() {
    it('should return whatever data you gave it', function() {
      var t = trie(), key = 'one', value = 'data';
      t.add(key, value);
      assert.equal(t.get(key), value);
    });
    it('should return undefined if no data matches', function() {
      var t = trie();
      assert.equal(t.get('key'), undefined);
    });
  });

  describe('#getAllMatchingKeysAndValues()', function() {
    it('should return all the keys and values matching a particular substring', function() {
      var t = trie();
      var results;

      t.add('bettie', true);
      t.add('bartholemew', true);
      t.add('benny', true);
      t.add('barry', true);
      t.add('benjamin', true);
      t.add('bertha', true);
      t.add('bessie', true);
      t.add('ada', false);

      results = t.getAllMatchingKeysAndValues('b');

      assert.equal(results.ettie, true);
      assert.equal(results.artholemew, true);
      assert.equal(results.enny, true);
      assert.equal(results.enjamin, true);
      assert.equal(results.ertha, true);
      assert.equal(results.essie, true);
      assert.equal(results.da, undefined);
    });
  });

});