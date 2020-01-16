function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Text size
        main.textSize = 40;
        // Text spacing
        main.textSpacing = 10;
        // Frame interval for adding new lines
        main.interval = 1;

        // Currently falling lines
        main.lines = [];
        // Current taken spaces
        main.taken = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        line.globals();

        // Set unicode font
        textFont(40);
        textSize(main.textSize);
        textAlign(CENTER, CENTER);
    }

    static draw() {
        // Clear the screen
        background(0);

        if (frameCount % main.interval == 0) {
            // Get a random position
            let x = Math.floor(random(main.textSpacing, width));
            // Snap the position to the text spacing grid
            x -= x % main.textSpacing;

            main.lines.push(new line({
                x: x,
                // Offset the y value so the lines don't suddenly appear
                y: line.speed / 2
            }));

            main.taken.push(x);
        }

        main.lines = main.lines.filter(line => {
            line.update();

            // Check if the highest character on the line is off the screen
            const highest = line.previous[0];
            if (highest != null) {
                return highest.y < window.innerHeight;
            }
        });
    }
}