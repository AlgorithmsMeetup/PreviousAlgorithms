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
    
    expect(newobj["key1"]).to.be(originalobj["key1"]);

    expect(newarray[0]).to.be(originalarray[0]);

    expect(newobj).to.not.be(originalobj);

    expect(newarray).to.not.be(originalarray);
  });

  it('should not copy deeper than one level', function() {
    var newobj = clone(originalobj);
    var newarray = clone(originalarray);

    expect(newobj["key3"]["innerkey3"]).to.eql(originalobj["key3"]["innerkey3"]);

    expect(newarray[3][0]).to.eql(originalarray[3][0]);
  });
});
