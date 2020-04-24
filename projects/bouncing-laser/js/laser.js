class laser {
    static globals() {
        // Color of the laser
        laser.color = color(219, 0, 99);
        laser.levels = laser.color.levels;
        // Speed of the laser (0-1)
        laser.speed = 0.3;
        // Width of the laser
        laser.width = 2;
        // How many frames a laser trail should be visible for
        laser.historyTTL = 25;
    }

    constructor() {
        // History of previously hit nodes
        this.history = [];

        // Get a random starting node
        this.node = this.getRandomNode();
        // Set the position data from the selected node
        this.getNewPosition(this.node.getPosition());
    }

    draw() {
        // Get the current position of the laser between the start and end positions
        const position = createVector(
            lerp(this.startPosition.x, this.endPosition.x, this.progress), 
            lerp(this.startPosition.y, this.endPosition.y, this.progress));

        // Draw the laser
        stroke(laser.color);
        noFill();
        line(position.x, position.y, this.startPosition.x, this.startPosition.y);

        // Draw the laser's history
        this.history = this.history.filter((item) => {
            // Get the opacity for this history line (0-255)
            const opacity = (--item.ttl / laser.historyTTL) * 255;
            stroke(laser.levels[0], laser.levels[1], laser.levels[2], opacity);
            // Draw the line
            line(item.start.x, item.start.y, item.end.x, item.end.y);

            // Remove the history line if its time to live is at zero
            return item.ttl > 0;
        });

        // Update the lasers position
        this.progress += laser.speed;

        // Check if the laser has reached the end position
        if (this.progress >= 1) {
            // Get a new node to travel to
            this.node = this.getNewPosition(null);
        }
    }

    getNewPosition(start) {
        // Don't log a history node when initializing
        if (start == null) {
            this.history.push({
                ttl: laser.historyTTL,
                start: this.startPosition,
                end: this.endPosition
            });
        }

        // Mark the current node as hit
        this.node.hit();

        // Get a new random node
        const node = this.getRandomNode();

        // Reset variables
        this.progress = 0;
        this.startPosition = start || this.endPosition;
        this.endPosition = node.getPosition();

        return node;
    }

    getRandomNode() {
        return main.nodes[floor(random(main.nodes.length))];
    }
}