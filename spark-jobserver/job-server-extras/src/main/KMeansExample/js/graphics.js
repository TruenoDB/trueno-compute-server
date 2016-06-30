//see http://bl.ocks.org/mbostock/4063663
var width = 960,
  size = 150,
  padding = 19.5;

var x = d3.scale.linear()
  .range([padding / 2, size - padding / 2]);

var y = d3.scale.linear()
  .range([size - padding / 2, padding / 2]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .ticks(5);

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5);

var color = d3.scale.category10();

function drawData() {
  d3.select("svg").remove()
  $(".palette").remove()

  var domainByTrait = {};
  traits = getActiveLabels();
  n = traits.length;

  traits.forEach(function(trait) {
    domainByTrait[trait] = d3.extent(data, function(d) {
      return +d[trait];
    });
  });


  xAxis.tickSize(size * n);
  yAxis.tickSize(-size * n);

  var brush = d3.svg.brush()
    .x(x)
    .y(y)
    .on("brushstart", brushstart)
    .on("brush", brushmove)
    .on("brushend", brushend);

  var svg = d3.select("body").append("svg")
    .attr("width", size * n + padding)
    .attr("height", size * n + padding)
    .append("g")
    .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

  svg.selectAll(".x.axis")
    .data(traits)
    .enter().append("g")
    .attr("class", "x axis")
    .attr("transform", function(d, i) {
      return "translate(" + (n - i - 1) * size + ",0)";
    })
    .each(function(d) {
      x.domain(domainByTrait[d]);
      d3.select(this).call(xAxis);
    });

  svg.selectAll(".y.axis")
    .data(traits)
    .enter().append("g")
    .attr("class", "y axis")
    .attr("transform", function(d, i) {
      return "translate(0," + i * size + ")";
    })
    .each(function(d) {
      y.domain(domainByTrait[d]);
      d3.select(this).call(yAxis);
    });

  var cell = svg.selectAll(".cell")
    .data(cross(traits, traits))
    .enter().append("g")
    .attr("class", "cell")
    .attr("transform", function(d) {
      return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")";
    })
    .each(plot);

  // Titles for the diagonal.
  cell.filter(function(d) {
      return d.i === d.j;
    }).append("text")
    .attr("x", padding)
    .attr("y", padding)
    .attr("dy", ".71em")
    .text(function(d) {
      return d.x;
    });

  cell.call(brush);

  function plot(p) {
    var cell = d3.select(this);

    x.domain(domainByTrait[p.x]);
    y.domain(domainByTrait[p.y]);

    cell.append("rect")
      .attr("class", "frame")
      .attr("x", padding / 2)
      .attr("y", padding / 2)
      .attr("width", size - padding)
      .attr("height", size - padding);

    cell.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", function(d) {
        return x(d[p.x]);
      })
      .attr("cy", function(d) {
        return y(d[p.y]);
      })
      .attr("r", 3)
      .style("fill", function(d) {
        return color(d.Output);
      });
  }

  var brushCell;
  var brushTarget;

  // Clear the previously-active brush, if any.
  function brushstart(p) {
    if (brushCell !== this) {
      d3.select(brushCell).call(brush.clear());
      x.domain(domainByTrait[p.x]);
      y.domain(domainByTrait[p.y]);
      brushCell = this;
      brushTarget = p;
    }
  }

  // Highlight the selected circles.
  function brushmove(p) {
    var e = brush.extent();
    svg.selectAll("circle").classed("hidden", function(d) {
      return !selectedSpecies.has(d.Output) ||
        (e[0][0] > d[p.x] || d[p.x] > e[1][0] || e[0][1] > d[p.y] || d[p.y] > e[1][1]);
    });
  }

  // If the brush is empty, select all circles.
  function brushend() {
    if (brush.empty()) {
      svg.selectAll(".hidden").classed("hidden", function(d) {
        return !selectedSpecies.has(d.Output);
      });
      brushTarget = undefined;
    }
  }

  function cross(a, b) {
    var c = [],
      n = a.length,
      m = b.length,
      i, j;
    for (i = -1; ++i < n;)
      for (j = -1; ++j < m;) c.push({
        x: a[i],
        i: i,
        y: b[j],
        j: j
      });
    return c;
  }

  d3.select(self.frameElement).style("height", size * n + padding + 20 + "px");


  var species = d3.set(data.map(function(d) {
    return d.Output;
  })).values();
  var selectedSpecies = d3.set(species);

  d3.select("body")
    .append("span")
    .attr("class", "palette")
    .selectAll(".swatch")
    .data(species.map(function(d) {
      return {
        'key': d,
        'value': color(d)
      };
    }))
    .enter().append("span")
    .on("click", function(d) {
      if (selectedSpecies.size() === species.length)
        selectedSpecies = d3.set([d.key]);
      else if (selectedSpecies.has(d.key))
        selectedSpecies.remove(d.key);
      else
        selectedSpecies.add(d.key);

      if (selectedSpecies.empty()) {
        selectedSpecies = d3.set(species);
      }

      if (brushTarget) {
        brushmove(brushTarget);
      } else {
        svg.selectAll("circle").classed("hidden", function(d) {
          return !selectedSpecies.has(d.Output);
        });
      }

      d3.selectAll(".swatch").style('opacity', function(d) {
        return selectedSpecies.has(d.key) ? 1 : 0.3;
      });
    })
    .attr("class", "swatch")
    .attr("title", function(d) {
      return d.key;
    })
    .text(function(d) {
      return d.key;
    })
    .style("background-color", function(d) {
      return d.value;
    });
  if (haveContext) {
    $("#state")[0].innerText = "Ready to resample.";
    showContextRunning();
  }
}