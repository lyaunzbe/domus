$(function(){
  var frameHeight = 1600,
      frameWidth = 1600,
      cross = start = delta = null;

  console.log("HSDSDS");
  $('<canvas id="sketch">').appendTo('.sketch')
    .attr('width', frameWidth)
    .attr('height', frameHeight)

  var Cross = function(offset){
    this.vertical = {w :100 , h:400 };
    this.horizontal = {w:400 , h:100};
    this.center=  {x:400 , y:400};
    this.col = null;

    var self = this;
    
    $('#sketch').mousemove(function(e){
      self.center = {x:e.pageX, y: e.pageY};
    });

    $('#sketch').on('click', function(){
      ctx.rect(0,0,frameWidth,frameHeight);
      ctx.fillStyle = d3.hsl(Math.random()* 360, 1, 0.4784).toString();
      ctx.fill();
    })
  };

  Cross.prototype.draw = function(t) {
    ctx.beginPath();
    ctx.rect(
      this.center.x - (this.vertical.w/2), 
      this.center.y - (this.vertical.h/2), 
      this.vertical.w, this.vertical.h);

    ctx.fillStyle = this.col.toString();
    ctx.fill();


    ctx.rect(
      this.center.x - (this.horizontal.w/2), 
      this.center.y - (this.horizontal.h/2), 
      this.horizontal.w, this.horizontal.h);

    ctx.fillStyle = this.col.toString();
    ctx.fill();

  };

  Cross.prototype.modulate = function(t){
    this.col = d3.hsl(Math.tan(t)*180*~Math.random(), 1, 0.4784);

    this.vertical.w   = 100*Math.cos(Math.sin(t*5));
    this.vertical.h   = 400*Math.sin(Math.sin(t/Math.log(t*Math.random())));
    this.horizontal.w = 400*Math.tan(Math.cos(t*5));
    this.horizontal.h = 100*Math.cos(Math.sin(t/Math.log(t*Math.random())));


  }
  
  cvs = document.getElementById('sketch')
  ctx = cvs.getContext('2d')

  ctx.rect(0,0,frameWidth,frameHeight);
  ctx.fillStyle = 'black';
  ctx.fill();


  var render = function(){

    delta = (Date.now() - start)/1000;
    cross.modulate(delta);
    cross.draw(delta);

    if(Math.floor(delta) > 60)
      start = Date.now();
    return requestAnimFrame(render);
  }

  cross = new Cross();
  start = Date.now();
  requestAnimFrame(render);

});