(function() {
  var circle, group, paper, rect, style;

  paper = Snap(800, 400);

  style = {
    fill: '#318199',
    stroke: '#444',
    strokeWidth: 5
  };

  circle = paper.circle(200, 200, 60).attr(style);

  rect = paper.rect(300, 159, 100, 100).attr(style);

  group = paper.g(circle, rect);

  rect.attr({
    opacity: .5
  });

  group.drag(function(dx) {
    return this.transform("r" + dx + ",200,200");
  });

}).call(this);
