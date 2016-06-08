  var $simon = [];
  var $user = [];

  var $red = $('red');
  var $blue = $('blue');
  var $yellow = $('yellow');
  var $green = $('green');

  var $colors = ['red', 'blue', 'yellow', 'green'];
  var $rando = Math.floor(Math.random()*$colors.length);
  var $simonMove = '#'+$colors[$rando];

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
    $('div').removeClass();
    $rando = Math.floor(Math.random()*$colors.length);
    $simonMove = '#'+$colors[$rando];
    $($simonMove).addClass('animated pulse');
    $simon.push($simonMove);
    console.log($simon);
    // tunePlays();
  }

  //keycodes up(38), right(39), down(40), left(37)

  $(document).on("keydown", function(event) {
    if(event.which===38) {
      $('#blue').addClass('animated pulse');
      $(document).on("keyup", function(event) {
        $('#blue').removeClass();
      })
      console.log($blue);
    } // UP: blue
    else if(event.which===39) {
      $('#yellow').addClass('animated pulse');
      $(document).on("keyup", function(event) {
        $('#yellow').removeClass();
      })
      console.log($yellow);
    } // RIGHT: yellow
    else if(event.which===40) {
      $('#red').addClass('animated pulse');
      $(document).on("keyup", function(event) {
        $('#red').removeClass();
      })
      console.log($red);
    } // DOWN: red
    else if(event.which===37) {
      $('#green').addClass('animated pulse');
      $(document).on("keyup", function(event) {
        $('#green').removeClass();
      })
      console.log($green);
    } // LEFT: green
    else {
      console.log('not an arrow key');
    }
  });

  function simonStart() {
    // $(this).fadeIn('slow',function() {
    //   $(this).append($(this).html("follow the tunes.<br><br>Use the arrow keys to play along."));
    //   $('p').show();
    // });

    $(this).fadeOut('slow', function() {
      $(this).remove();
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
