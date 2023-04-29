var GRAVITY = 1000; // cm/s^2

function Droplet(pos, vel) {
    this.pos = pos;
    this.vel = vel;
}

Droplet.prototype.step = function(dt) {
    this.vel.y += GRAVITY * dt/1000.0;
    this.pos.add(p5.Vector.mult(this.vel, dt/1000.0));
};

Droplet.prototype.draw = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();

    let colour = color(
        Math.round(90+Math.random()*50),
        Math.round(160+Math.random()*60),
        Math.round(235+Math.random()*20)
    );
    let radius = 1+Math.random()*1;

    fill(colour);
    box(radius*2);
    pop();
};
