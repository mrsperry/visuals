class node {
    static globals() {
        // The spacing between each node
        node.areaWidth = 20;
        node.areaRadius = node.areaWidth / 2;
        // The thickness of node connections
        node.lineWidth = 2;
        // The color ramp used when determining the color of the node connection
        node.colorMap = [
            // Teal
            color(66, 212, 245),
            // Blue
            color(66, 158, 245),
            // Purple
            color(144, 66, 245),
            // Magenta
            color(194, 66, 245),
            // Pink
            color(245, 66, 158),
            // Orange
            color(245, 156, 66),
            // Yellow
            color(242, 245, 66)
        ];
        // All possible node connection directions
        node.directions = [
            [-1, -1], [0, -1], [1, -1],
            [-1,  0],          [1,  0],
            [-1,  1], [0,  1], [1,  1] 
        ];
    }

    constructor(x, y) {
        // Set the node position
        this.position = createVector(x * node.areaWidth, y * node.areaWidth);
        // Store indices to use when creating this node's connection
        this.indices = createVector(x, y);
    }

    draw() {
        // Draw the connection
        stroke(this.color);
        noFill();
        line(this.position.x, this.position.y, this.connection.position.x, this.connection.position.y);
    }

    createConnection() {
        // Get a random direction to connect to
        const direction = node.directions[floor(random(node.directions.length))];

        // Get the list of nodes in the direction
        const nodes = main.grid[this.indices.x + direction[0]];
        // Check if the node in the direction tat was selected is out of bounds
        if (nodes != null && nodes[this.indices.y + direction[1]] != null) {
            // Get the selected node
            const selected = nodes[this.indices.y + direction[1]];

            // Cancel the connection if these nodes are already connected
            if (selected.connection != this) {
                this.connection = selected;
                this.createColor();
                return true;
            }
        }
        
        return false;
    }

    createColor() {
        // Get the distance from the center of the screen to this node
        const distance = main.center.dist(this.position);
        // Truncate the distance of this node from to center to a color stop
        const baseline = distance / main.centerDistance;
        // Get the color stop index
        const colorStop = floor(baseline);

        if (colorStop == 0) {
            // Set the closest color to the center if the node isn't far enough away
            this.color = node.colorMap[colorStop];
        } else if (colorStop >= node.colorMap.length) {
            // Set the furthest color to the center if the node goes over the limit of color stops
            this.color = node.colorMap[colorStop - 1];
        } else {
            // Set the color to the lerped value
            this.color = lerpColor(node.colorMap[colorStop - 1], node.colorMap[colorStop], baseline - colorStop);
        }
    }
}