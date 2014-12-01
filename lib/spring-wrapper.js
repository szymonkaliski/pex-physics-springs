var Spring = require("./spring");

module.exports = function(Keys) {
  function SpringWrapper(position, stiffness, friction, threshold, dt) {
    this.position = Keys.reduce(function(memo, key) {
      memo[key] = new Spring(position[key], stiffness, friction, threshold, dt);
      return memo;
    }, {});
  }

  SpringWrapper.prototype.setPosition = function(position) {
    Keys.forEach(function(key) {
      this.position[key].setPosition(position[key]);
    }.bind(this));
  };

  SpringWrapper.prototype.setTarget = function(position) {
    Keys.forEach(function(key) {
      this.position[key].setTarget(position[key]);
    }.bind(this));
  };

  SpringWrapper.prototype.getPosition = function() {
    return Keys.reduce(function(memo, key) {
      memo[key] = this.position[key].getPosition();
      return memo;
    }.bind(this), {});
  };

  SpringWrapper.prototype.getDefault = function() {
    return Keys.reduce(function(memo, key) {
      memo[key] = this.position[key].getDefault();
      return memo;
    }.bind(this), {});
  };

  SpringWrapper.prototype.update = function() {
    Keys.forEach(function(key) {
      this.position[key].update();
    }.bind(this));
  };

  return SpringWrapper;
};
