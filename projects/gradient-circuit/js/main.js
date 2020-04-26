function setup() {
    main.setup();
}

class main {
    static globals() {
        // Grid containing all possible nodes
        main.grid = [];

        // Tne center of the screen
        main.center = createVector(window.innerWidth / 2, window.innerHeight / 2);
        // Get the distance from the center of the screen to the edge of the screen divided by the number of color stops
        const dimensions = createVector(window.innerWidth, window.innerHeight);
        main.centerDistance = main.center.dist(dimensions) / node.colorMap.length;
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        node.globals();
        main.globals();

        // How many nodes can fit on the x/y axis
        const xCount = ceil(window.innerWidth / node.areaWidth) + 1;
        const yCount = ceil(window.innerHeight / node.areaWidth) + 1;

        // Fill in the grid with nodes
        for (let x = 0; x < xCount; x++) {
            main.grid[x] = [];

            for (let y = 0; y < yCount; y++) {
                main.grid[x].push(new node(x, y));
            }
        }

        // Filter out nodes that did not create a connection
        const nodes = [];
        for (const list of main.grid) {
            for (const current of list) {
                if (current.createConnection()) {
                    nodes.push(current);
                }
            }
        }

        // Set the background color
        background(0);
        // Set the node connection width
        strokeWeight(node.lineWidth);
        // Draw all nodes
        nodes.map((current) => current.draw());
    }
}