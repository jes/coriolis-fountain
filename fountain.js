var canvas;
var arms = [];

function setup() {
    canvas = createCanvas(600, 400, WEBGL);
    canvas.parent('canvas');
}

function draw() {
    orbitControl(1, 1, 0.1);
    background(200);

    let narms = val('arms');
    txt('showarms', narms);
    let rpm = val('rpm');
    txt('showrpm', rpm);
    let flowvel = val('flowvel');
    txt('showflowvel', flowvel);
    let vangle = val('verticalangle');
    txt('showverticalangle', vangle);
    let hangle = val('horizontalangle');
    txt('showhorizontalangle', hangle);

    if (arms.length != narms) {
        while (arms.length > narms)
            arms.pop();
        while (arms.length < narms)
            arms.push(new Arm(0, 100, 60));
        for (let i = 0; i < arms.length; i++)
            arms[i].angle = i * (2*PI/narms);
    }

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
