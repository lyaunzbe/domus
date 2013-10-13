jQuery ->
  
  frameHeight = 800
  frameWidth = 1120
  start = 0
  lastShuffle = null

  $('<canvas id="sketch">').appendTo('.sketch')
    .attr('width', frameWidth)
    .attr('height', frameHeight)
  
  cvs = document.getElementById('sketch')
  ctx = cvs.getContext('2d')

  num = 55
  radius = 25
  rotation = 2*Math.PI / num
  speed = .5
  x_factor = 10

  circle = (x, y, r, col) ->
    ctx.beginPath()
    ctx.arc x, y, r, 0, 2.0 * Math.PI, false
    ctx.fillStyle = col.toString()
    ctx.fill()

  points = (angle, amp) ->
    x: frameWidth/2 + Math.cos(angle) * amp
    y: frameHeight/2 + Math.sin(angle) * amp

  render = (t) ->
    i = 0
    
    ctx.clearRect(0, 0, frameWidth, frameHeight)
    t = t/1000
    
    c_time = Math.floor(t)

    if ((c_time % 5 == 0))
      x_factor+=.5

    while (i < num)

      slice = x_factor * Math.PI / num
      amp = (Math.cos( speed*t + slice*i) * 80) + -165
      pos = points(rotation * i, amp)
      col = d3.hsl(i*(360/num), 1, 0.4784)
      circle(pos.x, pos.y, radius, col)
      i++

    requestAnimFrame(render)

  do () ->
    console.log('yo');
    if(window.performance.now)
      start = window.performance.now();
    else
      start = Date.now();
    requestAnimFrame(render)
