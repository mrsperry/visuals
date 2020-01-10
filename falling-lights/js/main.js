function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    // Maximum number of lights drawn at once
    static maxLights = 600;

    // Array of all lights being drawn
    static lights = [];
    // Array of spaces taken
    static taken = [];

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set the background to black
        background(0);

        // Set the inital colors of the sequence
        sequence.setColors();
    }

    static draw() {
        // Update the color sequence
        sequence.update();

        // Remove any lights that have completed their life cycle
        main.lights = main.lights.filter(light => {
            // Draw the light
            light.draw();

            if (light.completed == null) {
                return true;
            } else {
                // Mark this pixel as taken
                this.taken.splice(this.taken.indexOf(light.position.x), 1);
                return false;
            }
        });
    
        // Add an additional light each frame until the max is reached
        if (main.lights.length < main.maxLights && main.lights.length < window.innerWidth) {
            let x;
            do {
                // Find a random non-taken pixel
                x = round(random(window.innerWidth)) + 0.5;
            } while (main.taken.includes(x));

            main.lights.push(new light({
                x: x,
                y: 0
            }));

            this.taken.push(x);
        }
    }
}