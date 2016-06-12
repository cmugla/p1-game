  var $simon = [];
  var $user = [];

  var $colors = ['#red', '#blue', '#yellow', '#green'];
  var $rando;
  var simonMove;

$(document).ready(function(){
  console.log("loaded");

  // when button clicked, start game
  $('button').click(simonStart);

  // start game
  function simonStart() {
    // reset user and simon inputs from any previous games, remove any classes left behind
    $user = [];
    $simon = [];

    $('p').show();

    // fade out the start button (get it out of the way)
    $(this).fadeOut('slow', function() {
      $(this).hide();
      // setTimeout(function() {
      //   $('p').hide();
      // }, 1000);
    });

    // after button fades, start the game
    setTimeout(tuneAnim, 1000);
  }

  function tuneAnim() {
    // generate a new random number for the index of the array
    $rando = Math.floor(Math.random()*$colors.length);
    // set the id of Simon's move
    simonMove = $colors[$rando];
    // add that move to the simon array
    $simon.push(simonMove);
    console.log($simon);

    // start the animations
    simonSing();
  }

  function simonSing() {
    // display the animations of each of simons move at 1s intervals
    for(let t=0; t<$simon.length; t++) {
      setTimeout(function() {
        $($simon[t])
          .addClass('bloom')
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){ $(this).removeClass(); });
        playAudio($simon[t]);
      }, t*700);
    }

    // start listening for keypresses
    iterateUser();
  }

  function iterateUser() {
    // listen for which key is pressed
    $(document).off("keydown", checkKeyPress).on("keydown", checkKeyPress);

    // click for mobile
    $('#blue').off('click',checkClick).click(checkClick);
    $('#red').off('click',checkClick).click(checkClick);
    $('#yellow').off('click',checkClick).click(checkClick);
    $('#green').off('click',checkClick).click(checkClick);
  }

  function checkClick() {
    if (this===$('#blue')[0]) {
      playAudio('#blue');
      userInput('#blue');
      console.log('blue');
    } else if (this===$('#red')[0]) {
      playAudio('#red');
      userInput('#red');
      console.log('red');
    } else if (this===$('#yellow')[0]) {
      playAudio('#yellow');
      userInput('#yellow');
      console.log('yelow');
    } else if (this===$('#green')[0]) {
      playAudio('#green');
      userInput('#green');
      console.log('green');
    } else {
      console.log(this);
    }
  }

  function checkKeyPress(event) {
    // remove any lost classes
    $('div').removeClass();
    // depending on which key pressed, show an animation for the appropriate div
    if(event.which===38) {
      playAudio('#blue');
      userInput('#blue');
    } // UP: blue
    else if(event.which===39) {
      playAudio('#yellow');
      userInput('#yellow');
    } // RIGHT: yellow
    else if(event.which===40) {
      playAudio('#red');
      userInput('#red');
    } // DOWN: red
    else if(event.which===37) {
      playAudio('#green');
      userInput('#green');
    } // LEFT: green
    else {
      console.log('not an arrow key');
    }
  }

  // audio elements
  // modified from Ahmet Can Güven's post on Stack Overflow http://stackoverflow.com/questions/8489710/play-an-audio-file-using-jquery-when-a-button-is-clicked
  var audioElement = $('audio');
  var notes = [ 'audio/A_2.mp3',
                'audio/Csharp_2.mp3',
                'audio/E_2.mp3',
                'audio/Elow_2.mp3'];
  var indexBlue = 2;
  var indexYellow = 1;
  var indexRed = 0;
  var indexGreen = 3;

  function playAudio(id) {
    // play audio

    if(id==='#blue') {
      audioElement
        .attr({src:notes[indexBlue], autoplay:'autoplay'})
    } else if(id==='#yellow') {
      audioElement
        .attr({src:notes[indexYellow], autoplay:'autoplay'})
    } else if(id==='#red') {
      audioElement
        .attr({src:notes[indexRed], autoplay:'autoplay'})
    } else if(id==='#green') {
      audioElement
        .attr({src:notes[indexGreen], autoplay:'autoplay'})
    }
  }

  function userInput(id) {
    // show an animation for the approporiate div
    $(id).addClass('bloom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
      $(this).removeClass();
    });
    // push that input into the array
    $user.push(id);

    console.log($user);
    // check if that input was correct
    checkWin();
  }

  function checkWin() {
    // checks if the user has more keys to press before win
    if($user.length < $simon.length) {
      console.log("User has less inputs, iterate again");
      if($user[$user.length-1]===$simon[$user.length-1]) {
        // if yes, listens for a keypress
        iterateUser();
      } else {
        console.log('Nope!');
        $('button').text('Nice Try! Play Again?')
        $('button').show();
      }
    } // if they have the same length
      else if($user.length===$simon.length) {
        // check if they match
        if($user.join()===$simon.join()) {
          console.log('they match');
          // start user with an empty array before they guess
          $user=[];
          setTimeout(tuneAnim,1000);
        } else {
          console.log('Nope!');
          $('button').html("<span>Sahweet, you scored a "
            + $simon.length + "</span> Play again?");
          $('button').show();
        }
    } else {
      console.log("for some reason, user has more inputs than Simon");
    }
  };

});
