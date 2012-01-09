var w = 960,
    h = 500;

var vertices = d3.range(100).map(function(d) {
  return [Math.random() * w, Math.random() * h];
});

var svg = d3.select("#chart")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "PiYG")
    .on("mousemove", update);

svg.selectAll("path")
    .data(d3.geom.voronoi(vertices))
  .enter().append("path")
    .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
    .data(vertices.slice(1))
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 2);

function update() {
  vertices[0] = d3.behavior.mouse(this);
  svg.selectAll("path")
      .data(d3.geom.voronoi(vertices)
      .map(function(d) { return "M" + d.join("L") + "Z"; }))
      .filter(function(d) { return this.getAttribute("d") != d; })
      .attr("d", function(d) { return d; });
}
