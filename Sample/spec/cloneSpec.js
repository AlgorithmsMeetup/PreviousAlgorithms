//Clone spec
describe('clone', function() {
  var originalobj = {
    "key1": "hello",
    "key2": "world",
    "key3": {
      "innerkey1": 20,
      "innerkey2": 30,
      "innerkey3": {
        "innestkey1": "smiles"
      }
    } 
  };
  var originalarray = ["hello", "world", "smiles", ["klingons", "vulcans"]];

  it('should make a one level deep copy', function() {
    var newobj = clone(originalobj);
    var newarray = clone(originalarray);
    
    expect(newobj["key1"]).to.eql(originalobj["key1"]);

    expect(newarray[0]).to.eql(originalarray[0]);

    expect(newobj["key3"]).to.not.eql(originalobj["key3"]);

    expect(newarray[3]).to.not.eql(originalarray[3]);
  });

  it('should not copy deeper than one level', function() {
    var newobj = clone(originalobj);
    var newarray = clone(originalarray);

    expect(newobj["key3"]["innerkey1"]).to.eql(originalobj["key3"]["innerkey1"]);

    expect(newarray[3][0]).to.eql(originalarray[3][0]);
  });
});
