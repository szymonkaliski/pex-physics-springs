function Spring(position, stiffness, friction, threshold, dt) {
  this.setPosition(position);

  this.velocity = 0;
  this.acceleration = 0;

  this.stiffness = stiffness || 70;
  this.friction  = friction  || 3;
  this.threshold = threshold || 0.04;
  this.dt        = dt        || 1 / 30;
}

Spring.prototype.setPosition = function(position) {
  this.position = [
    "target",
    "current",
    "default"
  ].reduce(function(memo, key) {
    memo[key] = position;
    return memo;
  }, {});
};

Spring.prototype.setTarget = function(position) {
  if (position) {
    this.position.target = position;
  }
  else {
    this.position.target = this.position.default;
  }
};

Spring.prototype.getPosition = function() {
  return this.position.current;
};

Spring.prototype.getDefault = function() {
  return this.position.default;
};

Spring.prototype.update = function() {
  var eps = 0.01;

  var smallerThanEps = [
    this.position.current - this.position.target,
    this.acceleration,
    this.velocity
  ].reduce(function(memo, value) {
    return memo && (Math.abs(value) < eps);
  }, true);

  if (!smallerThanEps) {
    var dist = this.position.target - this.position.current;
    this.acceleration = this.stiffness * dist - this.friction * this.velocity;
    this.velocity += this.acceleration * this.dt;
    this.position.current += this.velocity * this.dt;
  }
};

module.exports = Spring;

