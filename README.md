# pex-physics-springs

Simple springs physics for [Pex](http://vorg.github.io/pex/) library, working with floats, Vec2, and Vec3.

## Examples

For use with simple float numbers:

```javascript
var Window = require("pex-sys").Window;
var Platform = require("pex-sys").Platform;
var Canvas = require("omgcanvas");

var Spring = require("pex-physics-springs").Spring;

Window.create({
  settings: {
    width: 1280,
    height: 720,
    type: "2d"
  },

  init: function() {
    this.position = new Spring(this.height / 2);

    if (Platform.isBrowser) {
      this.context = this.canvas.getContext("2d");
    }
    else {
      this.context = new Canvas.CanvasContext(this.canvas);
    }

    this.on("mouseMoved", function(event) {
      this.position.setTarget(event.y);
    });
  },

  draw: function() {
    this.position.update();
    var current = this.position.getPosition();

    this.context.fillRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.moveTo(0, current);
    this.context.lineTo(this.width, current);

    this.context.strokeStyle = "white";
    this.context.stroke();
  }
});
```

For use with Vec2:

```javascript
var Window = require("pex-sys").Window;
var Platform = require("pex-sys").Platform;
var Vec2 = require("pex-geom").Vec2;
var Canvas = require("omgcanvas");

var Spring2 = require("pex-physics-springs").Spring2;

Window.create({
  settings: {
    width: 1280,
    height: 720,
    type: "2d"
  },

  init: function() {
    this.position = new Spring2(new Vec2(this.width, this.height).scale(0.5));

    if (Platform.isBrowser) {
      this.context = this.canvas.getContext("2d");
    }
    else {
      this.context = new Canvas.CanvasContext(this.canvas);
    }

    this.on("mouseMoved", function(event) {
      this.position.setTarget(new Vec2(event.x, event.y));
    }.bind(this));
  },

  draw: function() {
    this.position.update();
    var current = this.position.getPosition();
    var radius = 6;

    this.context.fillRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.arc(current.x, current.y, radius, 0, 2 * Math.PI, false);

    this.context.strokeStyle = "white";
    this.context.stroke();
  }
});
```

## Methods

### Spring(position, stiffness, friction, threshold, dt)

Constructor for spring, arguments:

* `position` - initial spring position (`float`/`Vec2`/`Vec3`) depending on (`Spring`/`Spring2`/`Spring3`)
* `stiffness` - spring stiffness
* `friction` - spring friction
* `threshold` - spring threshold
* `dt` - time coefficient, usually `1/30` or `1/60`

### setPosition(position)

Resets spring positions, arguments:

* `position` - new default and current spring position

### setTarget(position)

Sets spring target, arguments:

* `position` - spring "target", changing this will result in "springiness", if set to `null` the spring will default to initial position

### getPosition()

Returns current spring position.

### getDefault()

Returns default (initial) spring position.

### update()

Updates spring calculation, should be run in every `draw()` in Pex.

