var n = 16;
var fade = false;
var mouseDown = 0;
var option = "1";

$(document).ready(function() {
  buildGrid(n);
  onmousedown = function() {mouseDown = 1;}
  onmouseup = function() {mouseDown = 0;}
});

function buildGrid(n) {
  for (var i = 0; i < n*n; i++) {
    $('.wrapper').append('<div class="square"></div>');
  }
  $('.square').width((800.0/n)-2.0);
  $('.square').height((800.0/n)-2.0);
  if(option === "1") {color();}
  if(option === "2") {randomColor();}
  if(option === "3") {adding();}
  if(fade) {fade();}
}

function color() {
  $('.square').mouseenter(function() {
    if(mouseDown === 0) {
      $(this).css('background-color', '#076591');
    }
    else {
      $(this).css('background-color', '#9F40A0');
    }
  });
}

function randomColor() {
  $('.square').mouseenter(function() {
    $(this).css('background-color', getRandomColor());
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function fading() {
  if($('#fadebox').prop('checked')) {
    $('.square').mouseenter(function() {$(this).fadeTo(100,0);});
    $('.square').mouseleave(function() {
      $(this).fadeTo(900,1);
    });
  }
  else {
    $('.square').mouseenter(function() {$(this).stop(true);});
    $('.square').mouseleave(function() {
      $(this).stop(true);
    });
  }
}

function clearGrid() {
  $('.wrapper').empty();
  n = $('#size').val();
  option = $("input[name='option']:checked").val();
  if(n === "") {n = 16};
  buildGrid(n);
}
