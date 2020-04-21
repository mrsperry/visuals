function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Maximum number of walkers to be generated
        main.maxWalkers = 50;
        // Maximum number of updates that can occur on a walker
        main.maxUpdates = 100;
        // Current walkers
        main.walkers = [];
        // The center of the screen
        main.center = {
            x: Math.round(window.innerWidth / 2),
            y: Math.round(window.innerHeight / 2)
        };
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        walker.globals();

        // Set the width of the walker history
        strokeWeight(2);
    }

    static draw() {
        // Clear the screen
        background(0);

        // Draw all walkers
        main.walkers.map((walker) => walker.draw());

        // Add an additional walker if the max has not been reached
        if (main.walkers.length < main.maxWalkers) {
            this.addWalker();
        }
    }

    static addWalker() {
        main.walkers.push(new walker({
            x: main.center.x,
            y: main.center.y
        // Get the color stop value (0-1) of this walker
        }, ((100 * main.walkers.length) / main.maxWalkers) / 100));
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}