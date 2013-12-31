window.tweetit = function(){

  var twitterHtml = {
    button: 'You finished!<br><a style="margin: 0px auto" href="https://twitter.com/share" class="twitter-share-button" data-size="large" data-dnt="true" data-count="none" data-text="Just finished writing a clone algorithm!! cc @HackReactor" data-via="HackReactor">Tweet</a>',
    script: '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'
  };

  window.picoModal(twitterHtml.button);

  // twitter's script tag must be wrapped in a setTimeout and separated from
  // the above line, or it doesn't work.
  setTimeout(function(){
    $('body').append(twitterHtml.script);
  }, 0);

};
