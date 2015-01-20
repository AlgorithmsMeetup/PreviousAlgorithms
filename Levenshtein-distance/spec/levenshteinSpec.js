// mocha.setup({ignoreLeaks: true});

describe('Levenshtein Distance', function() {
  it('should be able to add a character', function(){
    expect(levenshtein('a' , 'ab' )).to.equal(1);
  });

  it('should be able to remove a character', function(){
    expect(levenshtein('ac' , 'a' )).to.equal(1);
  });

  it('should be able to substitute a character', function(){
    expect(levenshtein('a' , 'b' )).to.equal(1);
  });

  it('should be able to add characters', function(){
    expect(levenshtein('b' , 'abc' )).to.equal(2);
  });

  it('should be able to remove characters', function(){
    expect(levenshtein('abc' , 'b' )).to.equal(2);
  });

  it('should be able to substitute characters', function(){
    expect(levenshtein('abc' , 'zby' )).to.equal(2);
  });
});

xdescribe('Extra Credit: Lewis Carroll\'s Word Ladder', function() {
  it('can substitute a letter', function(){
    expect(wordLadder('book', 'boot')).to.equal(1);
  });

  it('can add a letter', function(){
    expect(wordLadder('rail', 'trail')).to.equal(1);
  });

  it('can remove a letter', function(){
    expect(wordLadder('book', 'boo')).to.equal(1);
  });

  it('can go from hate to love in 3', function(){
    expect(wordLadder('rail', 'trail')).to.equal(3);
  });

  it('can go from cold to warm in 4', function(){
    expect(wordLadder('cold', 'warm')).to.equal(4);
  });

  it('can go from lass to male in 4', function(){
    expect(wordLadder('book', 'boo')).to.equal(4);
  });

  it('can go from live to dead in 5', function(){
    expect(wordLadder('live', 'dead')).to.equal(5);
  });
});
