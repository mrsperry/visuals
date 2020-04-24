function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // List of all nodes
        main.nodes = [];
        // The laser object that travels to nodes
        main.laser = null;
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        node.globals();
        laser.globals();

        // How many nodes can fit on the x/y axis
        const xCount = floor(window.innerWidth / node.areaSize);
        const yCount = floor(window.innerHeight / node.areaSize);
        // The offset used to center all nodes on the x/y axis
        const xOffset = (window.innerWidth % node.areaSize) / 2;
        const yOffset = (window.innerHeight % node.areaSize) / 2;

        // Create all nodes
        for (let x = 0; x < xCount; x++) {
            for (let y = 0; y < yCount; y++) {
                // Check if this node should be skipped
                if (random(0, 100) <= node.skipChance) {
                    continue;
                }
                
                // Add the node with the appropriate offsets
                main.nodes.push(new node(xOffset + (x * node.areaSize), yOffset + (y * node.areaSize)));
            }
        }

        // Create the laser
        strokeWeight(laser.width);
        main.laser = new laser();
    }

    static draw() {
        // Clear the screen
        background(0);

        // Draw the laser
        main.laser.draw();

        // Draw all nodes
        noStroke();
        fill(node.color);
        main.nodes.map(node => node.draw());
    }
}