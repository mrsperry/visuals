class node {
    static globals() {
        // Global color of the nodes
        node.color = color(0, 219, 149);
        // Color the node flashes to when hit
        node.hitColor = color(121, 235, 252);
        // Speed at which the color of a hit node returns to normal (0-1)
        node.resetSpeed = 0.02;
        // Possible sizes of nodes
        node.sizes = [10, 15, 20];
        // Zone of control for each node (smaller = less nodes)
        node.areaSize = 100;
        node.halfArea = node.areaSize / 2;
        // Chance a node is skipped when placing (higher = less nodes)
        node.skipChance = 50;
    }

    constructor(x, y) {
        // Set the position
        this.position = createVector(round(x), round(y));
        // Get a random size for this node
        this.size = node.sizes[floor(random(0, node.sizes.length))];
        // Set the color reset progress
        this.resetProgress = 0;

        // Create a random offset so nodes aren't lined up in a grid
        const halfSize = this.size / 2;
        this.offset = createVector(
            round(random(0, node.areaSize - halfSize)), 
            round(random(0, node.areaSize - halfSize)));
    }

    draw() {
        let color = node.color;

        // Check if this node's color is resetting
        if (this.resetProgress > 0) {
            this.resetProgress -= node.resetSpeed;

            // Get the color of the node based on the reset progress
            color = lerpColor(node.color, node.hitColor, this.resetProgress);
        }

        // Draw the node
        fill(color);
        circle(this.position.x + this.offset.x, this.position.y + this.offset.y, this.size);
    }

    hit() {
        // Set the reset progress (makes the node flash)
        this.resetProgress = 1;
    }

    getPosition() {
        return createVector(this.position.x + this.offset.x, this.position.y + this.offset.y);
    }
}