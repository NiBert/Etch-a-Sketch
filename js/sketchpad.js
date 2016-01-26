n = 24;
fade = false

$(document).ready(function() {
  buildGrid(n);
  $('.square').width((800.0/n)-2.0);
  $('.square').height((800.0/n)-2.0);
  $('.square').mouseenter(color);
  if(fade === true) {
    $('.square').mouseleave();
  }
});

function buildGrid(n) {
  for (var i = 0; i < n*n; i++) {
    $('.wrapper').append('<div class="square"></div>');
  }
}

function color() {
  $(this).addClass('colored');
}
