class level {
    static globals() {
        // Total number of levels
        level.count = 15;
        // Width for each level in pixels
        level.width = 50;
        // Space between each level in pixels
        level.spacing = 10;
        // Total width of a level
        level.totalWidth = level.width + level.spacing;
        // Maximum height for each level
        level.maxHeight = round(window.innerHeight / 3);
        // Multiplier for height reductions
        level.heightMultiplier = 70;
        // Minimum amount levels can bounce in pixels
        level.minBounce = 10;
        // Maximum amount levels can bounce in pixels
        level.maxBounce = 30;
        // Minimum speed for bouncing (0-1)
        level.minSpeed = 0.05;
        // Maximum speed for bouncing (0-1)
        level.maxSpeed = 0.1;
    }

    // Current bounce progress
    progress = 0;

    constructor(position, height) {
        this.position = position;
        this.height = height;
    }

    draw() {
        // Check if the bounce is done returning
        if (this.progress <= 0) {
            // Reset values
            this.returning = false;
            this.start = 0;
            // Set a new random bounce height
            this.target = round(random(level.minBounce, level.maxBounce));
            // Set a new random bounce speed
            this.speed = random(level.minSpeed, level.maxSpeed);
        } else if (this.progress >= 1) {
            // Mark this level as returning
            this.returning = true;
            // Invert the speed to move down
            this.speed = -this.speed;
        }

        // Update the bounce progress
        this.progress += this.speed;

        // Get the current y offset based off the bounce progress
        const offset = lerp(this.start, this.target, this.progress);
        // Get the starting y coordinate with the offset
        const startY = this.position.y - offset;
        // Get the ending y coordinate with the offset
        let endY = this.height + (offset * 2);

        noFill();
        stroke(50);
        // Draw the level
        rect(this.position.x, startY, level.width, endY);
        
        // Update the end y position to include the start offset
        endY += startY;

        // Add connector dots to each corner of the level
        noStroke();
        fill(connector.color);
        // Top left
        circle(this.position.x, startY, connector.size);
        // Top right
        circle(this.position.x + level.width, startY, connector.size);
        // Bottom left
        circle(this.position.x, endY, connector.size);
        // Bottom right
        circle(this.position.x + level.width, endY, connector.size);
    }
}