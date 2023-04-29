var canvas;
var arms = [];

function setup() {
    canvas = createCanvas(600, 400, WEBGL);
    canvas.parent('canvas');
}

function draw() {
    orbitControl(1, 1, 0.1);
    background(200);
    fill(255);
    noStroke();

    let narms = val('arms');
    txt('showarms', narms);
    let armlength = val('armlength');
    txt('showarmlength', armlength/100);
    let rpm = val('rpm');
    txt('showrpm', rpm);
    let flowvel = val('flowvel')/100;
    txt('showflowvel', flowvel);
    let vangle = val('verticalangle');
    txt('showverticalangle', vangle);
    let hangle = val('horizontalangle');
    txt('showhorizontalangle', hangle);

    if (arms.length != narms) {
        while (arms.length > narms)
            arms.pop();
        while (arms.length < narms)
            arms.push(new Arm(0, armlength, rpm));
        for (let i = 0; i < arms.length; i++)
            arms[i].angle = i * (2*PI/narms);
    }

    translate(0, 180, -100);
    if (checked('rotatingframe'))
        rotateY(-arms[0].angle);

    for (let arm of arms) {
        arm.length = armlength;
        arm.rpm = rpm;
        arm.flowvel = flowvel;
        arm.vangle = vangle*PI/180;
        arm.hangle = hangle*PI/180;
        arm.step(deltaTime);
        arm.draw();
    }

    let nboxes = 12;
    fill(200,200,127);
    for (let theta = 0; theta < 2*PI; theta += (2*PI)/nboxes) {
        push();
        rotateY(theta);
        translate(0, 0, 210);
        box(60, 10, 10);
        pop();
    }

    push();
    translate(0, 10, 0);
    fill(100,180,100);
    noStroke();
    box(1000, 10, 1000);
    pop();
}

function val(id) {
    return parseFloat(document.getElementById(id).value);
}
function checked(id) {
    return document.getElementById(id).checked;
}

function txt(id, str) {
    document.getElementById(id).innerText = str;
}
