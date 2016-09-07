(function() {
  var GUI, RadialNav, describeSector, discribeArc, gui, polarToCartesian;

  polarToCartesian = function(cx, cy, r, angle) {
    angle = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  discribeArc = function(x, y, r, startAngle, endAngle, continueLine) {
    var alter, end, large, start;
    start = polarToCartesian(x, y, r, startAngle &= 360);
    end = polarToCartesian(x, y, r, endAngle &= 360);
    large = Math.abs(endAngle - startAngle) >= 180;
    alter = endAngle > startAngle;
    return "" + (continueLine ? 'L' : 'M') + start.x + "," + start.y + " A" + r + "," + r + ",0, " + (large ? 1 : 0) + ", " + (alter ? 1 : 0) + ", " + end.x + ", " + end.y;
  };

  describeSector = function(x, y, r, r2, startAngle, endAngle) {
    return (discribeArc(x, y, r, startAngle, endAngle)) + " " + (discribeArc(x, y, r2, endAngle, startAngle, true)) + "Z";
  };

  GUI = (function() {
    function GUI(buttons) {
      this.paper = Snap(window.innerWidth, window.innerHeight);
      this.nav = new RadialNav(this.paper, buttons);
      this._bindEvents();
    }

    GUI.prototype._bindEvents = function() {
      return window.addEventListener('resize', (function(_this) {
        return function() {
          return _this.paper.attr({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
      })(this));
    };

    return GUI;

  })();

  RadialNav = (function() {
    function RadialNav(paper, buttons) {
      this.area = paper.svg(0, 0, this.size = 500, this.size).addClass('radialnav');
      this.center = this.size / 2;
      this.radOut = this.size * .25;
      this.rInner = this.radOut * .35;
      this.angle = 360 / buttons.lenght;
      this.container = this.area.g();
      this.updateButtons(buttons);
    }

    RadialNav.prototype._sector = function() {
      return this.area.path(describeSector(this.center, this.center, this.radOut, this.rInner, 0, this.angle)).addClass('radialnav-sector');
    };

    RadialNav.prototype._button = function(btn, sector) {
      return this.area.g(sector);
    };

    RadialNav.prototype.updateButtons = function(buttons) {
      var btn, button, i, j, len, results;
      this.container.clear();
      results = [];
      for (i = j = 0, len = buttons.length; j < len; i = ++j) {
        btn = buttons[i];
        button = this._button(btn, this._sector());
        button.transform("r" + (this.angle * i) + "," + this.center + "," + this.center);
        results.push(this.container.add(button));
      }
      return results;
    };

    return RadialNav;

  })();

  gui = new GUI([
    {
      icon: 'search',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'search',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'search',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'search',
      action: function() {
        return console.log('Opening Search');
      }
    }
  ]);

}).call(this);
