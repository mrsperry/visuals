class raindrop {
    static globals() {
        // Minimum length of a raindrop
        raindrop.minLength = 25;
        // Maximum length of a raindrop
        raindrop.maxLength = 50;
        // Constant speed of a raindrop (0-1)
        raindrop.speed = 0.05;
        // How long the raindrop should fade out for
        raindrop.ttl = 25;
        // The starting opacity value when a raindrop hits its target
        raindrop.hitOpacity = 5;
    }

    // Current speed
    speed = raindrop.speed;
    // Current progress
    progress = 0;
    // Current TTL
    ttl = raindrop.ttl;

    constructor() {
        // Set a random starting position along the top of the screen
        this.start = createVector(round(random(window.innerWidth)), 0);
        // Set the position to the start position
        this.position = createVector(this.start.x, this.start.y);
        // Set a random target below the position
        this.target = createVector(this.position.x, round(random(window.innerHeight)));
        // Set a random length for the raindrop
        this.length = round(random(raindrop.minLength, raindrop.maxLength));
    }

    draw() {
        // Check if this raindrop has hit its target
        if (this.hit) {
            // Draw the hit circle
            stroke(255, 255, 255, raindrop.hitOpacity * this.ttl);
            circle(this.position.x, this.position.y, (raindrop.ttl * 2) - this.ttl);

            // Reduce the time to live
            this.ttl--;
        } else {
            // Update the raindrop's position
            this.progress += this.speed;

            this.position.x = lerp(this.start.x, this.target.x, this.progress);
            this.position.y = lerp(this.start.y, this.target.y, this.progress);

            // Draw the raindrop
            stroke(150);
            line(this.position.x, this.position.y, this.position.x, this.position.y - this.length);

            // Check if the raindrop has hit its target
            if (this.progress >= 1) {
                this.hit = true;
            }
        }
    }
}