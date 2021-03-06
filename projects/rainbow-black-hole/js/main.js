function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // How many lights can be added each frame
        main.maxLightsPerFrame = 10;

        // Set the center of the screen
        main.center = {
            x: round(window.innerWidth / 2),
            y: round(window.innerHeight / 2)
        };
        // Set one third of the lower between width and height as the radius of the hole
        main.radius = round((window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) / 3);

        // Current lights
        main.lights = [];
    }

    static setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        noStroke();

        // Set globals
        main.globals();
        light.globals();
        sequence.globals();
    }

    static draw() {
        // Clear the screen
        background(0);

        sequence.update();

        for (let index = 0; index < main.maxLightsPerFrame; index++) {
            // Break if the max number of lights has been reached
            if (main.lights.length == main.maxLights) {
                break;
            }

            main.lights.push(new light());
        }

        // Remove any light that is at the center of the hole
        main.lights = main.lights.filter(light => {
            light.draw();
            return light.progress < 1;
        });
    }
}