const WIDTH = 650;
const HEIGHT = 650;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var translate = function(x, y){
  return 'translate('+x+','+y+')';
};

var generateSinChart = function () {

  var data =  [
    {x: 0, y: 5},
    {x: 1, y: 9},
    {x: 2, y: 7},
    {x: 3, y: 5},
    {x: 4, y: 3},
    {x: 5, y: 3.5},
    {x: 6, y: 4},
    {x: 7, y: 2},
    {x: 8, y: 3},
    {x: 9, y: 2}
  ];
  var chart = d3.select('.container').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  var xScale = d3.scaleLinear()
    .domain([0.0, 1.0])
    .range([0, INNER_WIDTH]);

  var yScale = d3.scaleLinear()
    .domain([1.0, 0.0])
    .range([0, INNER_HEIGHT]);


  var xAxis = d3.axisBottom(xScale).ticks(12);
  var yAxis = d3.axisLeft(yScale).ticks(10);

  chart.append('g')
    .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
    .call(xAxis)
    .classed('xAxis', true);

  chart.append('g')
    .attr('transform', translate(MARGIN, MARGIN))
    .call(yAxis)
    .classed('xAxis', true);

  var g = chart.append('g')
    .attr('transform',  translate(MARGIN, MARGIN));

  var line =  d3.line()
    .x(function(d){return xScale(d.x/10)})
    .y(function(d){
      return yScale(((Math.sin(3*d.x)+1)/2));
    });

  g.append('path').classed('sinLine', true).attr('d', line(data));

  drawDots(g, data, xScale, yScale);
};

var drawDots = function (svg, data, x, y) {
  svg.selectAll('dot')
    .data(data)
    .enter().append('circle')
    .classed('dot', true)
    .attr('r', 4)
    .attr('cx', function(d) {
      return x(d.x/10);
    })
    .attr('cy', function(d) {
      return y((Math.sin(3*d.x)+1)/2);
    });
};

window.onload = generateSinChart;