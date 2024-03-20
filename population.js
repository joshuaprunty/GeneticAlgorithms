function Population() {
    this.cars = [];
    this.popsize = 120;
    this.matingpool = [];

    for (var i = 0; i < this.popsize; i++) {
        this.cars[i] = new Car();
    }

    this.isDead = function () {
        for (let i = 0; i < this.popsize; i++) {
            if (this.cars[i].crashed == false) {
                return false;
            }
        }
        return true;
    }

    this.updateWinner = function () {

    }

    this.evaluate = function () {
        var maxfit = 0;
        var bestCar;
        for (var i = 0; i < this.popsize; i++) {
            this.cars[i].calcFitness();
            if (this.cars[i].fitness > maxfit) {
                maxfit = this.cars[i].fitness;
                bestCar = this.cars[i];
            }
        }
        for (var i = 0; i < this.popsize; i++) {
            this.cars[i].fitness /= maxfit;
        }
        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            var n = this.cars[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.cars[i]);
            }
        }
        return Math.round(100 * bestCar.testHeading / TWO_PI);
    };

    // Selects appropriate genes for child
    this.selection = function () {
        var newCars = [];
        for (var i = 0; i < this.cars.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newCars[i] = new Car(child);
        }
        this.cars = newCars;
    };

    // Calls for update and show functions
    this.run = function (c) {
        for (var i = 0; i < this.popsize; i++) {
            this.cars[i].update(c);
            this.cars[i].show();
        }
    };
}