var canvas;
var arms;

function setup() {
    canvas = createCanvas(600, 400, WEBGL);
    canvas.parent('canvas');
    arms = [ new Arm(0, 100, 60), new Arm(2*PI/3, 100, 60), new Arm(4*PI/3, 100, 60) ];
}

function draw() {
    orbitControl(1, 1, 0.1);
    background(200);

    let rpm = val('rpm');
    txt('showrpm', rpm);
    let flowvel = val('flowvel');
    txt('showflowvel', flowvel);
    let vangle = val('verticalangle');
    txt('showverticalangle', vangle);
    let hangle = val('horizontalangle');
    txt('showhorizontalangle', hangle);

    translate(0, 180, -100);
    if (checked('rotatingframe'))
        rotateY(-arms[0].angle);

    for (let arm of arms) {
        arm.rpm = rpm;
        arm.flowvel = flowvel;
        arm.vangle = vangle*PI/180;
        arm.hangle = hangle*PI/180;
        arm.step(deltaTime);
        arm.draw();
    }
}

function val(id) {
    return document.getElementById(id).value;
}
function checked(id) {
    return document.getElementById(id).checked;
}

function txt(id, str) {
    document.getElementById(id).innerText = str;
}
