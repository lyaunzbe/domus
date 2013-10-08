var bg = ['http://upload.wikimedia.org/wikipedia/commons/8/81/Downtown_LA_from_GP_Obs.jpg',
          'http://i.imgur.com/tkkNO.jpg'];

var bg_text = ['Design.', 'Create.', 'Build.'],
    bgt_count = 0;
$(function(){
  $('.intro').css('background', 'url("'+bg[Math.floor(Math.random()*bg.length)]+'") no-repeat center center fixed');
  $('.intro').css('background-size', 'cover');

  // setInterval(function(){
  //   $('.intro .inner').fadeOut('1600', function(){
  //     $('.intro .inner').text(bg_text[bgt_count]);
  //     bgt_count = (bgt_count < bg_text.length - 1) ? bgt_count + 1 : 0;
  //     $('.intro .inner').fadeIn('3000');
  //   });
  // },6000);
});