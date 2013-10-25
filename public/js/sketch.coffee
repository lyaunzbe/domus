window.requestAnimFrame = do () ->
          window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          (callback, element) ->
            window.setTimeout(callback, 1000 / 60)



jQuery ->
  # Load sketch on click

  if (document.location.hash.length > 0)
    filename = document.location.hash.split('#')[1].toLowerCase()+'.js';
    $.getScript('./js/sketchbook/'+filename)
  
  $('.sidebar .list li a').click (e) -> 
    $('.sketch').empty()
    filename = $(this).text().toLowerCase()+'.js'

    $.getScript('./js/sketchbook/'+filename)
