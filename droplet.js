var GRAVITY = 1000; // cm/s^2

function Droplet(pos, vel, colour, radius) {
    this.pos = pos;
    this.vel = vel;
    this.colour = colour
    this.radius = radius;
}

Droplet.prototype.step = function(dt) {
    this.vel.y += GRAVITY * dt/1000.0;
    this.pos.add(p5.Vector.mult(this.vel, dt/1000.0));
};

Droplet.prototype.draw = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    fill(this.colour);
    box(this.radius*2);
    pop();
};
