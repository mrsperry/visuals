function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    // The refresh rate of the visualizer measured in frames (higher is slower)
    static refreshRate = 7;

    // The current cubes
    static cubes = [];

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set the background to black
        background(0);
        noStroke();

        // Set the center of the x axis
        main.center = round(window.innerWidth / 2);
        // Set the max number of levels any cube can have at once based on window height
        cube.maxLevels = floor(((window.innerHeight / 2) + (cube.cubeDimensions / 2)) / cube.cubeSize);

        // Get the total number of cubes that can fit on the screen
        const count = floor(window.innerWidth / cube.cubeSize);
        // Create an offset with the remaining space
        const offset = (window.innerWidth % cube.cubeSize) / 2;
        // Get the center of the y axis
        const middle = round(window.innerHeight / 2) - round(cube.cubeDimensions / 2);

        // Create all of the cubes
        for (let index = 0; index < count; index++) {
            main.cubes.push(new cube({
                x: offset + (index * cube.cubeSize),
                y: middle
            }));
        }
    }

    static draw() {
        // Check if the visualizer can refresh
        if (frameCount % main.refreshRate == 0) {
            // Clear the screen to get rid of all cube levels
            background(0);

            // Draw all of the cubes
            for (const cube of main.cubes) {
                cube.draw();
            }
        }
    }
}