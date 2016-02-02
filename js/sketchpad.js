var gridSize = 32;
var mouseDown = 0;

$(document).ready(function() {
  buildGrid(gridSize);
  // Listener for options and function calls:
  $('#color').change(color);
  $('#random').change(randomColor);
  //$('#opacity').change(adding);
  $('#fadebox').click(fading);
  // Listener for mouseDown Events:
  onmousedown = function() {mouseDown = 1;}
  onmouseup = function() {mouseDown = 0;}
});

function buildGrid(n) {
  // Add .square div elements to .wrapper:
  for (var i = 0; i < gridSize*gridSize; i++) {
    $('.wrapper').append('<div class="square"></div>');
  }
  // Calculate and set size of each .square:
  $('.square').width((800.0/n)-2.0);
  $('.square').height((800.0/n)-2.0);
  // Call function depending on which radio is checked:
  if($("input[name='option']:checked").attr('id') === "color") {color();}
  if($("input[name='option']:checked").attr('id') === "random") {randomColor();}
  if($("input[name='option']:checked").attr('id') === "opacity") {adding();}
}

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

function fading() {
  // Add .fade class with transition to get fade effect on .squares:
  $('.square').toggleClass('fade');
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
  }
}
