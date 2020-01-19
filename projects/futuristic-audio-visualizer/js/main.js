function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Set the center of the screen
        main.center = createVector(round(window.innerWidth / 2), round(window.innerHeight / 2));

        // Currently drawn levels
        main.levels = [];
        // Currently drawn connectors
        main.connectors = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(windowWidth, windowHeight);

        // Set globals
        main.globals();
        level.globals();
        connector.globals();

        // Get the starting point for the levels
        const start = main.center.x - (level.totalWidth * (level.count / 2));
        for (let index = 0; index < level.count; index++) {
            // Get the current x coordinate of this level
            const currentX = index * level.totalWidth;

            // Get the distance of this level from the center of the screen
            const distance = dist(start + currentX + (level.totalWidth / 2), 0, main.center.x, 0);
            // Calculate the height based on the distance
            const height = round(level.maxHeight - (level.heightMultiplier * (distance / 100)));

            // Check if this height is greater than the y radius of connectors
            if (connector.yRadius == null || height > connector.yRadius) {
                // Set the new y radius
                connector.yRadius = height;
            }
        
            // Add a new level
            this.levels.push(new level({
                x: start + currentX + (level.spacing / 2),
                y: main.center.y - (height / 2)
            }, height));
        }

        // Set the x radius of connectors based on total width of the levels
        connector.xRadius = (level.totalWidth * level.count) / 1.5;

        // Generate connectors
        for (let angle = 0; angle < 360; angle += connector.angleSpacing) {
            main.connectors.push(new connector(angle));
        }
    }

    static draw() {
        // Clear the canvas
        background(0);

        main.levels.map(level => level.draw());

        noFill();
        stroke(50);
        // Draw the lines between connectors
        main.connectors.reduce((previous, current) => {
            // Check if the current connector is the last in the list
            if (current == main.connectors[main.connectors.length - 1]) {
                // Get the first connector
                const start = main.connectors[0];

                // Draw a line from the last connector to the first connector
                if (start != null) {
                    line(current.position.x, current.position.y, start.position.x, start.position.y);
                }
            }
            // Draw a line from the previous connector to this connector
            line(previous.x, previous.y, current.position.x, current.position.y);

            return current.position;
        }, 0);

        noStroke();
        fill(connector.color);
        // Draw the connectors
        main.connectors.map(connector => connector.draw());
    }
}