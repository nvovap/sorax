(function() {
  var GUI, RadialNav, animate, describeSector, discribeArc, gui, iconsPath, iconsPathHome, polarToCartesian;

  iconsPath = 'icons.svg';

  iconsPathHome = 'HOME.svg';

  Snap.plugin(function(Snap, Element) {
    return Element.prototype.hover = function(f_in, f_out, s_in, s_out) {
      return this.mouseover(f_in, s_in).mouseout(f_out || f_in, s_out || s_in);
    };
  });

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

  animate = function(obj, index, start, end, duration, easing, fn, cb) {
    var ref;
    (obj.animation != null ? obj.animation : obj.animation = [])((ref = [index]) != null ? ref.stop : void 0)();
    return obj.animation[index] = Snap.animate(start, end, fn, duration, easing, cb);
  };

  GUI = (function() {
    function GUI(buttons) {
      this.paper = Snap(window.innerWidth, window.innerHeight);
      Snap.load(iconsPath, (function(_this) {
        return function(icons) {
          _this.nav = new RadialNav(_this.paper, buttons, icons);
          return _this._bindEvents();
        };
      })(this));
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
    function RadialNav(paper, buttons, icons) {
      this.area = paper.svg(0, 0, this.size = 500, this.size).addClass('radialnav');
      this.center = this.size / 2;
      this.radOut = this.size * .25;
      this.rInner = this.radOut * .35;
      this.angle = 360 / buttons.length;
      this.container = this.area.g();
      this.updateButtons(buttons, icons);
    }

    RadialNav.prototype._animateButtonHover = function(button, start, end, duration, easing, cb) {
      return animate(button, 1, start, end, duration, easing, ((function(_this) {
        return function(val) {
          return button[0].attr({
            d: describeSector(_this.center, _this.center, _this.radOut - val * 10, rInner, 0, _this.angle)
          });
        };
      })(this)), cb);
    };

    RadialNav.prototype._sector = function() {
      return this.area.path(describeSector(this.center, this.center, this.radOut, this.rInner, 0, this.angle)).addClass('radialnav-sector');
    };

    RadialNav.prototype._button = function(btn, sector, icon, hint) {
      return this.area.g(sector, icon, hint).hover(function() {
        var el, j, len, ref, results;
        ref = [this[0], this[1], this[2]];
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          el = ref[j];
          results.push(el.toggleClass('active'));
        }
        return results;
      }).hover(this._buttonOver(this), this._buttonOut(this));
    };

    RadialNav.prototype._buttonOver = function(nav) {
      return function() {
        nav._animateButtonHover(this, 0, 1, 200, mina.easeinout);
        return this[2].removeClass('hide');
      };
    };

    RadialNav.prototype._buttonOut = function(nav) {
      return function() {
        return nav._animateButtonHover(this, 1, 0, 2000, mina.elastic, (function() {
          return this.addClass('hide');
        }).bind(this[2]));
      };
    };

    RadialNav.prototype._icon = function(btn, icons) {
      var bbox, icon;
      icon = icons.select("#" + btn.icon).addClass('radialnav-icon');
      bbox = icon.getBBox();
      console.log(bbox);
      return icon.transform("T" + (this.center - 33 * 0.7 / 2) + "," + (this.center - this.radOut + this.rInner - 12) + " R" + (this.angle / 2) + "," + this.center + "," + this.center + "S 0.7");
    };

    RadialNav.prototype._hint = function(btn) {
      var hint;
      hint = this.area.text(0, 0, btn.icon).addClass('radialnav-hint hide').attr({
        textpath: discribeArc(this.center, this.center, this.radOut, 0, this.angle)
      });
      hint.select('*').attr({
        startOffset: '50%'
      });
      return hint;
    };

    RadialNav.prototype.updateButtons = function(buttons, icons) {
      var btn, button, i, j, len, results;
      this.container.clear();
      results = [];
      for (i = j = 0, len = buttons.length; j < len; i = ++j) {
        btn = buttons[i];
        button = this._button(btn, this._sector(), this._icon(btn, icons), this._hint(btn));
        button.transform("r" + (this.angle * i) + "," + this.center + "," + this.center);
        results.push(this.container.add(button));
      }
      return results;
    };

    return RadialNav;

  })();

  gui = new GUI([
    {
      icon: 'HOME',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'CART',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'CAMERA',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'BLUETOOTH',
      action: function() {
        return console.log('Opening Search');
      }
    }, {
      icon: 'BATTERY',
      action: function() {
        return console.log('Opening Search');
      }
    }
  ]);

}).call(this);
