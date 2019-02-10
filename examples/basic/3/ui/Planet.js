"use strict";
/**
 * Planet class. All properties are close to real ones, I only scale them down by 1e6 */
function Planet(name, props) {
    Body.Solid.call(this, name);

    this.position.set(props.loc.x, props.loc.y);
    this.mass = props.mass;

    this.addForce("gravity", props.g.mag, props.g.angl);
    this.setVelocity(props.vel.mag || 0, props.vel.angl || 0)
}

Planet.prototype = Object.create(Body.Solid.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.gravitateTo = function (planet, delta) {

    this.update(delta);

    var vec = this.subtractFrom(planet);
    var mag = (planet.mass * this.mass) /(vec.magnitude * vec.magnitude);
    var angl = vec.angle;

    this.gravity.magnitude = mag;
    this.gravity.angle = angl;
};