function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Total number of raindrops that can be falling
        main.totalRaindrops = 100;

        // Currently falling raindrops
        main.raindrops = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        raindrop.globals();

        // Remove filling from the raindrops
        noFill();
    }

    static draw() {
        // Clear the canvas
        background(0);

        // Create a new raindrop
        if (main.raindrops.length < main.totalRaindrops) {
            main.raindrops.push(new raindrop());
        }

        // Remove completed raindrops
        main.raindrops = main.raindrops.filter(raindrop => {
            raindrop.draw();

            return raindrop.ttl != 0;
        });
    }
}