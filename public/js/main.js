var bg = ['./img/la.jpg',
          'http://i.imgur.com/tkkNO.jpg'];

var bgt_count = 0;

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};


$(function(){
  $('a').smoothScroll({offset:-78});

  // Load a random high res bg
  $('.intro').css('background', 'url("'+bg[Math.floor(Math.random()*bg.length)]+'") no-repeat center center fixed');
  $('.intro').css('background-size', 'cover');

  // Initialize dynamic text replacement
  $('.inner').dynamo({
    delay: Math.floor((Math.random()*5000)+3000)
  });

  // Initialize force graph
  function forceGraph(data){
    var w = 700,
    h = 700,
    nodes = [{ id:3, size:100, name:'lute', url:'http://github.com/lyaunzbe/lute'}, { id:6, size:70, name:'node-fliptop', url:'https://github.com/poptip/node-fliptop'}, 
             {id:4, size:80, name: 'derrida', url:'http://github.com/lyaunzbe/derrida'}, { id:5, size:60, name:'fadeAway', url:'http://github.com/lyaunzbe/fadeaway'}, 
             { id:1, size:150, name:'mffm', url:'http://github.com/lyaunzbe/mffm'}, { id:2, size:130, name:'hiphopJS', url:'http://github.com/lyaunzbe/hiphop'},],
    node;

    function charge(d) {
      return -Math.pow(d.size, 2) / 4;
    }

    var force = d3.layout.force()
      .nodes(nodes)
      .size([w, h])
      .links([])
      .on("tick", tick)
      .charge(charge);


    var vis = d3.select(".project-wrap").append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("position", "absolute");

    function tick(e) {

      var k = .1 * e.alpha;
      nodes.forEach(function(o, i) {
        o.y += (300 - o.y) * k;
        o.x += (400 - o.x) * k;
      });

      node.attr("transform",function(d){ return "translate("+d.x+","+d.y+")";});
    };


    setInterval(function(){
        nodes.forEach(function(o, i) {
          o.y += (300 - o.y) * (Math.random()*.1)+.1;
          o.x += (100 - o.x) * (Math.random()*.1)+.1;
        });
        force.resume();

    }, 6000);

    // Update the nodes…
    node = vis.selectAll("g")
        .data(nodes)
        .attr("r", function(d) { return d.size; });

    // Enter any new nodes.
    
    node.enter().append("g").attr("class", "circle")
        .on("mouseover",function(){
          var self = this,
              prev = d3.selectAll("g.active"),
              sel = d3.select(self);

          //Remove style for old circle
          prev.select('circle').style("fill", function(d){ return 'rgba(51,51,51,'+d.size/200+')';})
            .style("stroke", function(d) { return d3.rgb(61,61,61); }).style("stroke-width", 2);
          prev.select('text').style("fill", "rgba(49, 49, 49, 0.75)");

          //Style new active circle and move it to front
          sel.attr('class', 'circle active')
             .select('circle').style("fill", "rgba(31,31,51,.85)")
             .style("stroke", function(d){return d3.rgb(231, 231, 231)}).style("stroke-width", 5);
          sel.select('text').style("fill", "rgba(231, 231, 231, 0.75)");
          sel.moveToFront();

          // Active right info panel. Make sure to ignore extra mouseover triggers.
          if( $('.project-exp li.active').length > 0){ 
            var itemID = $('.project-exp li.active').attr('id') ? 
                          parseInt($('.project-exp li.active').attr('id')) : null;

            if( (itemID && itemID !== d3.select(self).datum().id) || !itemID ){
              $('.project-exp li.active').removeClass('active').fadeOut(300, function(){
                $('.project-exp #'+d3.select(self).datum().id)
                  .addClass('active').hide().fadeIn(300);
              });
            }
            
          }
        })
        .on("mousedown", function(){
          d3.event.stopPropagation();
          nodes.forEach(function(o, i) {
            o.x += (Math.random() - .5) * ((Math.random()*100)+40);
            o.y += (Math.random() - .5) * ((Math.random()*100)+40);
          });
          force.resume();
        })
        .attr("transform",function(d){ return "translate("+d.x+","+d.y+")";})
        .call(force.drag)
        .append("circle")
        .attr("r", function(d) { return d.size; })
        .style("fill", function(d){ return 'rgba(51,51,51,'+d.size/200+')';})
        .style("stroke", function(d) { return d3.rgb(61,61,61); })
        .style("stroke-width", 2);

        node
        .append("a")
          .attr("xlink:href", function(d){ return d.url})
          .append("text")
          .text(function(d){return d.name})
          .attr("font-size", function(d){return 22*d.size/100+"px";});

    // Restart the force layout.
    force.start();
  }
  forceGraph();

});