function DNA(genes) {
    if (genes) {
        this.genes = genes;
    }
    else {
        this.genes = [];
        for (var i = 0; i < lifespan / 3; i++) {
            this.genes[i] = map(random(), 0, 1, -PI / 10, PI / 10);
        }
    }

    // Performs a crossover with another member of the species
    this.crossover = function (partner) {
        var newgenes = [];
        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[i];
            }
            else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    };

    // this.crossover = function (partner) {
    //     var newgenes = [];
    //     for (var i = 0; i < this.genes.length; i++) {
    //         let coinFlip = random();
    //         if (coinFlip > 0.5) {
    //             newgenes[i] = this.genes[i];
    //         }
    //         else {
    //             newgenes[i] = partner.genes[i];
    //         }
    //     }
    //     return new DNA(newgenes);
    // };

    // Adds random mutation to the genes to add variance.
    this.mutation = function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.02) {
                this.genes[i] = map(random(), 0, 1, -PI / 10, PI / 10);
            }
        }
    };
}