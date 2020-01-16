function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Maximum number of arms on screen at once
        main.maxArms = 300;
        // The stroke weight or width of each arm
        main.armSize = 2;
        // The color of all the arms
        main.armColor = color(255);
        
        // Center of the screen
        main.center = createVector(window.innerWidth / 2, window.innerHeight / 2);
        // Currently drawn arms
        main.arms = [];
    }
    
    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        arm.globals();

        // Set the stroke weight and color
        strokeWeight(main.armSize);
        stroke(main.armColor);
    }

    static draw() {
        // Clear the screen
        background(0);

        // Add additional arms if there is space
        if (main.arms.length < main.maxArms) {
            main.arms.push(new arm());
        }

        // Draw and remove completed arms
        main.arms = main.arms.filter(arm => {
            arm.draw();

            return !arm.completed;
        });
    }
}