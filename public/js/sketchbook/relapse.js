// Generated by CoffeeScript 1.6.3
jQuery(function() {
  var circle, circles, ctx, cvs, delta, frameHeight, frameWidth, max, old, render, start;
  frameHeight = 800;
  frameWidth = 800;
  start = null;
  delta = null;
  old = null;
  max = 200;
  circles = [];
  $('<canvas id="sketch">').appendTo('.sketch').attr('width', frameWidth).attr('height', frameHeight);
  cvs = document.getElementById('sketch');
  ctx = cvs.getContext('2d');
  circle = function(x, y, r, col) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2.0 * Math.PI, false);
    ctx.fillStyle = col.toString();
    return ctx.fill();
  };
  render = function(t) {
    var c, i, r, _i, _len;
    delta = Math.floor((Date.now() - start) / 1000);
    if (delta !== old) {
      if (delta % 0.5 === 0 || delta === 0) {
        if (delta % 2 === 0) {
          c = {
            x: 400,
            y: 400,
            col: 'white',
            start: Date.now()
          };
          circles.push(c);
        } else {
          c = {
            x: 400,
            y: 400,
            col: d3.hsl(delta * 10, 1, 0.4784).toString(),
            start: Date.now()
          };
          circles.push(c);
        }
      }
    }
    i = 0;
    for (_i = 0, _len = circles.length; _i < _len; _i++) {
      c = circles[_i];
      r = (Math.log(Date.now() - c.start) / Math.log(2)) * 20;
      if (c.col === 'white') {
        r = r > 260 ? 260 : r;
      } else {
        r = r > 250 ? 250 : r;
      }
      circle(c.x, c.y, r, c.col);
      i++;
    }
    old = delta;
    return requestAnimFrame(render);
  };
  return (function() {
    start = Date.now();
    return requestAnimFrame(render);
  })();
});
