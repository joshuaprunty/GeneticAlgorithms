function Car(dna) {
    this.pos = createVector(287, 0);
    this.vel = createVector(-1, -2);
    this.acc = createVector(0, 0);
    this.carDist = this.pos.mag();
    this.baseVec = createVector(1, 0)
    this.carTheta = this.baseVec.angleBetween(this.pos);
    this.crashed = false;
    this.bufferTimer = 10;
    this.completed = false;
    this.fitness = 0;
    this.testHeading;
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }

    this.applyRotation = function (rot) {
        this.vel.rotate(rot)
    }

    this.trackCurve = function (angle) {
        return (2 + (1 / 4) * sin(4 * angle) + (1 / 8) * cos(6 * angle))
    }

    // Calulates fitness of car
    this.calcFitness = function () {
        this.testHeading = -this.pos.heading();
        if (this.testHeading < 0) {
            this.testHeading += TWO_PI;
        }
        this.fitness = (this.testHeading ** 2);
        if (this.completed) {
            this.fitness *= 10;
        }
    };

    // Updates state of car
    this.update = function (c) {
        this.carTheta = this.baseVec.angleBetween(this.pos);
        this.innerBorder = 110 * this.trackCurve(this.carTheta);
        this.outerBorder = 160 * this.trackCurve(this.carTheta);
        this.carDist = this.pos.mag();
        if (this.carDist > this.outerBorder) {
            this.crashed = true;
            this.vel.setMag(0);
        }
        if (this.carDist < this.innerBorder) {
            this.crashed = true;
            this.vel.setMag(0);
        }
        var testHeading = this.pos.heading();
        if (0.01 < testHeading && testHeading < 0.02) {
            this.completed = true;
            this.vel.setMag(0);
        }
        if (c % 3 == 0) {
            this.applyRotation(this.dna.genes[floor(count / 3)]);
        }
        this.acc.setMag(this.vel, 0.1);
        if (!this.completed && !this.crashed) {
            this.pos.add(this.vel);
        }
    };

    this.show = function () {
        push();
        stroke(0, 0, 0);
        fill(255);
        ellipse(this.pos.x, this.pos.y, 6, 6);
        ellipse(0, 0, 10, 10)
        pop();
    };
}