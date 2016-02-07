/* Variuables */

var gridSize = 32;
var mouseDown = 0;
// Variable to escape from recursive blink():
var blinking = false;


/* Main function: Building grid and initialize listener */

$(document).ready(function() {
  buildGrid(gridSize);
  // Listener for options and function calls:
  $('#color').change(color);
  $('#random').change(randomColor);
  $('#fadebox').click(fading);
  $('#sbox').click(surprise);
  // Listener for mouseDown Events:
  onmousedown = function() {mouseDown = 1;}
  onmouseup = function() {mouseDown = 0;}
});


/* Build and clear Grid */

function buildGrid(n) {
  // Add .square div elements to .wrapper:
  for (var i = 0; i < gridSize*gridSize; i++) {
    $('.wrapper').append('<div class="square"></div>');
  }
  // Calculate and set size of each .square:
  $('.square').width((800.0/n));
  $('.square').height((800.0/n));
  // Call function depending on which radio is checked:
  if($("input[name='option']:checked").attr('id') === "color") {color();}
  if($("input[name='option']:checked").attr('id') === "random") {randomColor();}
}

function clearGrid() {
  // Get the new grid size:
  gridSize = $('#size').val();
  // In case no grid size was entered:
  if(gridSize === "") {gridSize = 32};
  // Catch unsuitably grid Size:
  if(gridSize < 1 || gridSize > 100) {
    alert("Do you want to crash your PC?\nYou better choose a size between 1-100!")
  } else {
    // Delete all elements in the .wrapper:
    $('.wrapper').empty();
    buildGrid(gridSize);
    // Check if fade checkbox is checked:
    if($('#fadebox').prop('checked')) {fading();}
    // Can u guess my favourite number? ;-)
    if(gridSize === "7") {
      blinking = true;
      blink('.square');
    }
  }
}


/* Options */

// Option 1: Color the .square in one color
function color() {
  $('.square').mouseenter(function() {
    // Blue if mouse not pressed
    if(!mouseDown) {
      $(this).css('background-color', '#076591');
    }
    // Pink if mouse pressed
    else {
      $(this).css('background-color', '#9F40A0');
    }
  });
}

// Option 2: Color the .square in a random color
function randomColor() {
  $('.square').mouseenter(function() {
    $(this).css('background-color', getRandomColor());
  });
}

function fading() {
  // Add .fade class with transition to get fade effect on .squares:
  // $('.square').toggleClass('fade');  <-- Is not working in htmlpreview ...
  if($('#fadebox').is(':checked')) {
      $('.square').css('transition', 'background 1.8s linear');
    } else {
      $('.square').css('transition', 'background 0s linear');
    }
}

// Suprise: Lower opacity each time the mouse enters the .square
// and adds blinking effect when opacity reaches 0:
function surprise() {
  if($('#sbox').is(':checked')) {
    $('.square').mouseenter(function() {
      var op = $(this).css('opacity');
      // Lower opacity if greater then 0:
      if (op > 0) {$(this).css('opacity', op - 0.1);
      // Else reset the opacity to 1 and make it blink:
      } else {
        $(this).css('opacity', 1);
        blinking = true;
        blink($(this));
      }
    });
  // When checkbox gets unchecked:
  } else {
      // Set back opacity:
      $('.square').css('opacity', 1);
      // Stop blinking by escaping the rescursion (see below):
      blinking = false;
      // Unbind all functions fram .square and recall color/randomColor function:
      // (Probably not the best Solution...)
      $('.square').unbind();
      if($("input[name='option']:checked").attr('id') === "color") {color();}
      if($("input[name='option']:checked").attr('id') === "random") {randomColor();}
  }
}


// Helper functions:

function getRandomColor() {
  // Split 16 possible letters to an array:
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  // Appand 6 random letters to color:
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function blink(selector){
  if(blinking) {
    // Fade out, color it with a random color and then fade in again:
    $(selector).fadeOut('normal', function(){
      $(selector).css('background-color', getRandomColor());
        $(this).fadeIn('normal', function(){
          // Recursion call for infinite blinking:
          blink(this);
        });
    });
  }
}
