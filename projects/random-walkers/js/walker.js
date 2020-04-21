class walker {
    static globals() {
        // Color stop start
        walker.colorStart = color(main.random(0, 256), main.random(0, 256), main.random(0, 256));
        // Color stop end
        walker.colorEnd = color(main.random(0, 256), main.random(0, 256), main.random(0, 256));
        // The minimum amount a walker can move
        walker.minIncrement = 16;
        // The maximum amount a walker can move
        walker.maxIncrement = 48;
        // The radius of the head of the walker
        walker.radius = 5;
    }

    constructor(position, colorStop) {
        // The position history of the walker
        this.history = [];
        // The current position
        this.position = position;
        // The color of the walker
        this.color = lerpColor(walker.colorStart, walker.colorEnd, colorStop);
        // How many updates this walker has received
        this.updates = 0;
    }

    draw() {
        if (this.updates <= main.maxUpdates) {
            // Get the main direction (vertical or horizontal)
            let mainDirection = this.getRandomDirection();
            // Get the offset direction (up/down or left/right)
            let offsetDirection = this.getRandomDirection();

            // Get a random distance to move
            const increment = main.random(walker.minIncrement, walker.maxIncrement + 1);

            // Add the current position to the history
            this.history.push({
                x: this.position.x,
                y: this.position.y
            });

            // Update the walker's position
            this.position[mainDirection ? "x" : "y"] += increment * (offsetDirection ? 1 : -1);

            // Increment this walker's update count
            this.updates++;
        }

        // Draw the walker's history
        stroke(this.color);
        noFill();
        this.history.reduce((previous, current) => {
            if (previous != null) {
                line(previous.x, previous.y, current.x, current.y);
            }

            return current;
        });

        // Draw a line from the latest point in history to the current position
        const latest = this.history[this.history.length - 1];
        line(latest.x, latest.y, this.position.x, this.position.y);

        // Draw the walker head
        noStroke();
        fill(this.color);
        rect(this.position.x - walker.radius, this.position.y - walker.radius, walker.radius * 2, walker.radius * 2);
    }

    getRandomDirection() {
        return Math.round(Math.random()) == 0;
    }
}