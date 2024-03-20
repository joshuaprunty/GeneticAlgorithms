let r;
let pos;
let carTheta;
let baseVec;
let vel;
let carDist;
let innerBorder;
let outerBorder;
let bufferTimer;
let speed;
let viewTheta;
let testP;
let testHeading;

var sldr = document.getElementById('viewRot');


function setup() {
  createCanvas(800, 800, WEBGL);

  baseVec = createVector(1, 0);
  bufferTimer = 10;
  viewTheta = 0;
  pos = createVector(287, 0);
  vel = createVector(0, -1);
  speed = 0.1;
  testP = createP();

}

function trackCurve(angle) {
  return (2 + (1 / 4) * sin(4 * angle) + (1 / 8) * cos(6 * angle))
}

function draw() {
  background(170);
  perspective(PI / 3, 1, 10, 1100);

  // viewTheta += 0.002;

  if (speed < 2) { speed += 0.01; }
  if (bufferTimer > 0) { bufferTimer -= 1; }

  let vr = document.getElementById('viewRot').value / 180;
  rotateX(vr);
  rotateZ(viewTheta);

  push();

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


  pop();

  vel.setMag(speed);
  pos.add(vel);

  ellipse(pos.x, pos.y, 8, 8);

  carDist = pos.mag();
  carTheta = baseVec.angleBetween(pos);
  innerBorder = 110 * trackCurve(carTheta);
  outerBorder = 160 * trackCurve(carTheta);

  let r1 = 160 * trackCurve(carTheta - 0.01);
  let r2 = 160 * trackCurve(carTheta + 0.01);

  let x1 = r1 * cos(carTheta - 0.01);
  let y1 = r1 * sin(carTheta - 0.01);

  let x2 = r2 * cos(carTheta + 0.01);
  let y2 = r2 * sin(carTheta + 0.01);

  let borderTangent = createVector(x2 - x1, y2 - y1);

  // borderTangent.rotate(PI / 2);

  if (bufferTimer == 0) {
    if (carDist > outerBorder - 2) {
      bufferTimer = 10;
      speed /= 3;
      vel = borderTangent.rotate(PI - 0.5);
      vel.setMag(speed);
    }
    if (carDist < innerBorder + 2) {
      bufferTimer = 10;
      speed /= 3;
      vel = borderTangent.rotate(PI + 0.5);
      vel.setMag(speed);
    }
  }

  line(235, 0, 340, 0);

  testHeading = -pos.heading();
  if (testHeading < 0) {
    testHeading += TWO_PI;
  }
  testP.html(testHeading)


}