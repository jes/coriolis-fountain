function Arm(angle, length, rpm) {
    this.angle = angle;
    this.length = length;
    this.rpm = rpm;
    this.droplets = [];
    this.flowvel = 6; // m/s
    this.vangle = 0;
    this.hangle = 0;
}

Arm.prototype.step = function(dt) {
    for (let i = this.droplets.length-1; i >= 0; i--) {
        this.droplets[i].step(dt);

        // delete droplets once they fall too far
        if (this.droplets[i].pos.y > 10)
            this.droplets.splice(i, 1);
    }

    let anglestep = 2*PI * this.rpm * (dt/1000)/60;
    this.angle += anglestep;
    this.angle %= 2*PI;

    let ndroplets = Math.round(Math.random()*20);
    for (let i = 0; i < ndroplets; i++) {
        let axis = new p5.Vector(0,1,0);
        let pos = new p5.Vector(-1+Math.random()*2,-1+Math.random()*2,this.length-1+Math.random()*2);
        let vel = new p5.Vector(-5+Math.random()*10, -(this.flowvel*100)+Math.random()*10, -5+Math.random()*10);
        let vaxis = new p5.Vector(0,1,0);
        let haxis = new p5.Vector(0,0,1);
        vel = vel.rotate3d(haxis, this.hangle).rotate3d(vaxis, this.vangle);

        let colour = color(
        Math.round(90+Math.random()*50),
        Math.round(160+Math.random()*60),
        Math.round(235+Math.random()*20)
        );
        let radius = 1+Math.random()*1;

        let d = new Droplet(pos.rotate3d(axis, this.angle+anglestep*i/ndroplets), vel.rotate3d(axis, this.angle+anglestep*i/ndroplets), colour, radius);
        d.step(dt*i/ndroplets);
        this.droplets.push(d);
    }
};

Arm.prototype.draw = function() {
    for (let d of this.droplets)
        d.draw();

    push();
    rotateY(this.angle);
    translate(0, 0, this.length/2);
    box(3,3,this.length);
    pop();
};
