var population;
var lifespan = 1000;
var lifeP;
var gensP;
var count = 0;
var maxforce = 0.2;
var gens = 0;
let r;
let viewTheta;
let winner = 0;
let winnerP;


function setup() {
    createCanvas(800, 800, WEBGL);
    viewTheta = 0;
    population = new Population();
    lifeP = createP();
    gensP = createP();
    winnerP = createP();

}

function trackCurve(angle) {
    return (2 + (1 / 4) * sin(4 * angle) + (1 / 8) * cos(6 * angle))
}

function draw() {
    background(180);
    perspective(PI / 2, 1, 10, 1100);
    let vr = document.getElementById('viewRot').value / 180;
    rotateX(vr);
    rotateZ(viewTheta);

    population.run(count);
    lifeP.html("Current Generation Timer: " + count);
    gensP.html("Generation #" + gens);
    winnerP.html("Best completion score: " + winner + "%")

    count++;

    if (count == lifespan || population.isDead()) {
        winner = max(winner, population.evaluate());
        population.selection();
        count = 0;
        gens += 1;
    }
    stroke(200, 140, 20);
    strokeWeight(2);
    noFill();

    for (let z = 0; z < 8; z += 4) {
        beginShape();
        for (let theta = 0; theta < TWO_PI; theta += 0.01) {
            r = 110 * trackCurve(theta)
            let x = r * cos(theta);
            let y = r * sin(theta);
            vertex(x, y, z);
        }
        endShape(CLOSE);
    }
    for (let z = 0; z < 16; z += 4) {
        beginShape();
        for (let theta = 0; theta < TWO_PI; theta += 0.01) {
            r = 160 * trackCurve(theta)
            let x = r * cos(theta);
            let y = r * sin(theta);
            vertex(x, y, z);
        }
        endShape(CLOSE);
    }
    stroke(200, 200, 200);
    for (let rad = 115; rad < 160; rad += 10) {
        beginShape();
        for (let theta = 0; theta < TWO_PI; theta += 0.01) {
            r = rad * trackCurve(theta)
            let x = r * cos(theta);
            let y = r * sin(theta);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
    line(235, 0, 340, 0);
}