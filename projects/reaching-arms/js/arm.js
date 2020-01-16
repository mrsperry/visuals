class arm {
    static globals() {
        // Minimum speed of an arm
        arm.minSpeed = 0.0005;
        // Maximum speed of an arm
        arm.maxSpeed = 0.005;
    }

    // Starting point of the arm
    start = createVector(main.center.x, main.center.y);
    // End point of the arm
    target = createVector(round(random(window.innerWidth)), round(random(window.innerHeight)));
    // Current arm position
    position = createVector(main.center.x, main.center.y);
    // Speed of the arm
    speed = random(arm.minSpeed, arm.maxSpeed);
    // Progress of the arm from the start point to the end point (0-1)
    progress = 0;

    draw() {
        // Update the arms progress
        this.progress += this.speed;

        // Set the start and end points
        let start = this.start;
        let end = this.target;
        // Swap the start and end points if the arm is retracting
        if (this.retracting) {
            start = this.target;
            end = this.start;
        }

        // Draw the arm
        line(this.start.x, this.start.y, this.position.x, this.position.y);

        // Update the arms's position
        this.position.x = lerp(start.x, end.x, this.progress);
        this.position.y = lerp(start.y, end.y, this.progress);

        // Check if the arm has been completed
        if (this.progress >= 1) {
            // Check if the arm was already retracting, if so mark this arm as completed
            if (this.retracting) {
                this.completed = true;
            } else {
                // Reset the progress of the arm and mark it as retracting
                this.progress = 0;
                this.retracting = true;
            }
        }
    }
}