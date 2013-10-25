jQuery ->

  frameHeight = 800
  frameWidth = 800

  start = null
  delta = null
  old = null

  max = 200

  circles = []

  $('<canvas id="sketch">').appendTo('.sketch')
    .attr('width', frameWidth)
    .attr('height', frameHeight)


  cvs = document.getElementById('sketch')
  ctx = cvs.getContext('2d')


  circle = (x, y, r, col) ->
    ctx.beginPath()
    ctx.arc x, y, r, 0, 2.0 * Math.PI, false
    ctx.fillStyle = col.toString()
    ctx.fill()

  render = (t) ->
    delta = Math.floor((Date.now() - start)/1000)
    if (delta != old)
      if (delta % 0.5 == 0 || delta == 0)
        if(delta % 2 == 0)
          c = 
            x : 400
            y : 400
            col: 'white'
            start : Date.now()
          circles.push(c)
        else
          c = 
            x : 400
            y : 400
            col: d3.hsl(delta*10, 1, 0.4784).toString()
            start: Date.now()
          circles.push(c) 

    i = 0
    for c in circles
      r = (Math.log(Date.now() - c.start)/Math.log(2))*20
      # r = r*(r/285)
      if c.col == 'white'
        r = if r > 260 then 260 else r
      else
        r = if r > 250 then 250 else r

      circle(c.x, c.y, r, c.col)
      i++

    old = delta



    requestAnimFrame(render)

  do () ->
    start = Date.now()
    requestAnimFrame(render)