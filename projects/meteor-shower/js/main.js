function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Set the center of the screen
        main.center = {
            x: round(window.innerWidth / 2),
            y: round(window.innerHeight / 2)
        };
        // The amount of opacity applied each frame (less means longer trails)
        main.opacity = 25;

        // Current meteors
        main.meteors = [];
    }

    static setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        noStroke();

        // Set globals
        main.globals();
        meteor.globals();

        // Clear the screen
        background(0);
    }

    static draw() {
        // Clear the screen
        background(0, 0, 0, main.opacity);
        
        main.meteors.push(new meteor());

        // Remove any meteor that is outside of the screen
        main.meteors = main.meteors.filter(meteor => {
            meteor.draw();
            return meteor.progress < 1;
        });
    }
}