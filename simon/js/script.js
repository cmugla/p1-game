  var $simon = [];
  var $user = [];

  var $red = $('red');
  var $blue = $('blue');
  var $yellow = $('yellow');
  var $green = $('green');

  var $colors = ['#red', '#blue', '#yellow', '#green'];
  var $rando = Math.floor(Math.random()*$colors.length);
  var simonMove = $colors[$rando];

$(document).ready(function(){
  console.log("loaded");

  $('p').hide();

  function change() {
    $(this).css('opacity','1.0');
  }

  function changeBack() {
    $(this).css('opacity','0.5');
  }

  // $('div').hover(change, changeBack);
  $('button').click(simonStart);

  function tuneAnim() {
    $rando = Math.floor(Math.random()*$colors.length);
    simonMove = $colors[$rando];
    $(simonMove).addClass('bloom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
      $(this).removeClass();
    });
    $simon.push(simonMove);
    console.log($simon);
    // tunePlays();
  }

  function userInput(id) {
    $(id).addClass('bloom').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
      $(this).removeClass();
    });
    $user.push(id);
    checkWin();
    console.log($user);
  }

  $(document).on("keydown", userPlay);

  function userPlay(event) {
    $('div').removeClass();
    if(event.which===38) {
      userInput('#blue');
    } // UP: blue
    else if(event.which===39) {
      userInput('#yellow');
    } // RIGHT: yellow
    else if(event.which===40) {
      userInput('#red');
    } // DOWN: red
    else if(event.which===37) {
      userInput('#green');
    } // LEFT: green
    else {
      console.log('not an arrow key');
    }
  }


  function checkWin() {
    if($user.join()===$simon.join()) {
      console.log('they match');
      setTimeout(tuneAnim,1500);
    } else {
      console.log('Nope!');
      $simon = [];
      $user = [];
      $('button').text('Nice Try! Play Again?')
      $('button').show();
    }
  }

  function simonStart() {
    $(this).fadeOut('slow', function() {
      $('div').removeClass('bloom');
      $(this).hide();
      $('p').hide();
    });

    setTimeout(tuneAnim, 1000);
  }

  function tunePlays() {
    setTimeout(tuneAnim, 1000);
  }

  function displayAnim() {
    // each index is displayed at a timeout of ####ms
  }


});
