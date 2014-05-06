describe('Correctly labels poker hands', function() {
  it("High card", function() {
    expect(poker.labelHand("9H 8C 4H 3S 2D")).to.equal("9 High");
    expect(poker.labelHand("QD JS 9S 8S 2S")).to.equal("Q High");
  });

  it("Pair", function() {
    expect(poker.labelHand("2C 2H 3C 4H 5S")).to.equal("Pair of 2");
    expect(poker.labelHand("KC KS QH 8S 3C")).to.equal("Pair of K");
  });

  it("Two Pair", function() {
    expect(poker.labelHand("AH AC 3D 3C 8S")).to.equal("Two pair of A and 3");
  });

  it("Three of a kind", function() {
    expect(poker.labelHand("8H 8C 8S KH JS")).to.equal("Three of kind of 8");
  });

  it("Straight", function() {
    expect(poker.labelHand("5C 6H 7S 8C 9D")).to.equal("Straight up to 9");
    expect(poker.labelHand("AH 2H 3S 5C 4H")).to.equal("Straight up to 5");
    expect(poker.labelHand("TC JS QS KH AD")).to.equal("Straight up to A");
  });

  it("Flush", function() {
    expect(poker.labelHand("3D KD TD 9D 5D")).to.equal("Flush with high card K");
  });

  it("Full House", function() {
    expect(poker.labelHand("AD 2C AS 2D AH")).to.equal("Full house of A");
    expect(poker.labelHand("3D 3C 3S TD TS")).to.equal("Full house of 3");
  });

  it("Four of a Kind", function() {
    expect(poker.labelHand("4S 4C 4H 5D 4D")).to.equal("Four of a kind of 4");
  });

  it("Straight Flush", function() {
    expect(poker.labelHand("5D 6D 7D 8D 9D")).to.equal("Straight flush up to 9");
    expect(poker.labelHand("AH 2H 3H 4H 5H")).to.equal("Straight flush up to 5");
  });

  it("Royal Flush", function() {
    expect(poker.labelHand("TC QC AC KC JC")).to.equal("Royal flush");
  });
});

describe("Correctly finds the winner between two or more poker hands", function() {
  it("Royal flush vs 7 high", function(){
    expect(poker.findWinner(["TC JC QC KC AC", "2C 3D 5C 6H 7H"])).to.equal(0);
  });
  it("Two pair vs Three of a kind", function(){
    expect(poker.findWinner(["TC TH 8D 9D 8H", "2C 2D 3C 2H 7H"])).to.equal(1);
  });
  it("Straight vs Flush", function(){
    expect(power.findWinner(["4C 5C 6D 7H 8S", "2D 4D 5D 8D KD"])).to.equal(1);
  });
  it("Full house vs Four of a kind", function(){
    expect(poker.findWinner(["8H 8D 8C 8S 9S", "3D 4D 3C 4C 3S"])).to.equal(0);
  });
  it("Pair vs Pair", function(){
    expect(poker.findWinner(["6H 7D 2C 6D TH", "TD TS 3H 2H KS"])).to.equal(1);
  });
  it("Straight vs Straight flush", function() {
    expect(poker.findWinner(["8C 9D TC JC QC", "8H 9H TH JH QH"])).to.equal(1);
  });
  it("Straight vs Straight", function(){
    expect(poker.findWinner(["3H 4D 5C 6C 7D", "2C 3D 4H 5H 6S"])).to.equal(0);
  });
  it("Flush vs Flush", function(){
    expect(poker.findWinner(["3H 6H 7H TH JH", "2C 6C 7C 8C 9C"])).to.equal(0);
  });
  it("Straight flush (ace high) vs Straight flush (ace low)", function(){
    expect(poker.findWinner(["AC 2C 3C 4C 5C", "TD JD QD KD AD"])).to.equal(1);
  });
  it("Pair (with different kicker)", function() {
    expect(poker.findWinner(["9H 9D KH 7D 2C", "9C 9S QD 4H 8C"])).to.equal(0);
  });
  it("Pair (with different low kicker)", function() {
    expect(poker.findWinner(["AC AS KH 8D 2S", "AD AH KD 8H 3S"])).to.equal(1);
  });
  it("Two pair (with different low pair)", function() {
    expect(poker.findWinner(["8H 8S 6H 7S 6S", "8D 8C 4H 4C AD"])).to.equal(0);
  });
  it("Two pair (with different kicker)", function() {
    expect(poker.findWinner(["8H 8S 6H 7S 6S", "8D 8C 6D 6C 2H"])).to.equal(0);
  });
  it("Straight (tied)", function(){
    expect(poker.findWinner(["4C 5C 6C 7C 8C", "4D 5D 6D 7D 8D"])).to.equal([0, 1]);
  });
  it("Pair (tied)", function() {
    expect(poker.findWinner(["AH AS 8C 6C 5C", "AC AD 8D 6D 5S"])).to.equal([0, 1]);
  });
  it("Three players", function(){
    expect(poker.findWinner(["2C 6C 4C 7C 9C", "4H 4S 4D 2D 2S", "TD JD KS QS AD"])).to.equal(1);
  });
  it("Four players (one winner)", function(){
    expect(poker.findWinner(["2D 3D 4D 5S 5C", "6H 7H 8H 9H TH", "2H 3H 4H 5H 5D"])).to.equal(1);
  });
  it("Four players (two winners)", function(){
    expect(poker.findWinner(["2D 3D 4D 5S 5C", "2C 3C 4C 4S 6H", "2H 3H 4H 5H 5D"])).to.equal([0, 2]);
  });
});















