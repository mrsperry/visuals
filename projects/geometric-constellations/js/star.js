class star {
    static globals() {
        // How far a star can connect to another star in pixels
        star.connectorRadius = 100;
        // The minimum size of a star
        star.minSize = 4;
        // The maximum size of a star
        star.maxSize = 10;
        // The minimum grayscale value of a star
        star.minColor = 130;
        // The maximum grayscale value of a star
        star.maxColor = 200;
        // The minimum speed of a star, measured in frames
        star.minSpeed = 0.0001;
        // The maximum speed of a star measured in frames
        star.maxSpeed = 0.0005;
    }

    size = round(random(star.minSize, star.maxSize));
    color = round(random(star.minColor, star.maxColor));
    speed = random(star.minSpeed, star.maxSpeed);
    // The progress percent (0-1) of this star's path
    progress = 0;
    // The number of stars conencted to this star
    connections = 0;

    constructor() {
        const getPosition = () => {
            // Get the axis this star will get a random coordinate for
            const axis = round(random()) == 0;
            // If the opposite axis should have its value revered
            const reverse = round(random()) == 0;
            // Amount of offset needed to hide the spawning of the star
            const offset = (this.size * 2) + 10;

            // Get a random coordinate for each axis
            const x = round(random(window.innerWidth));
            const y = round(random(window.innerHeight));

            // Set the coordinates to spawn on (either top-bottom or left-right)
            return {
                x: axis ? (reverse ? -offset : window.innerWidth + offset) : x,
                y: axis ? y : (reverse ? -offset : window.innerHeight + offset)
            };
        };

        // Set the initial position of the star
        this.startPosition = getPosition();
        // Set the end position of the star
        this.endPosition = getPosition();
        // Set the current position of the star
        this.position = {
            x: this.startPosition.x,
            y: this.startPosition.y
        };
    }

    draw() {
        this.progress += this.speed;

        // Set the new position of this star
        this.position.x = lerp(this.startPosition.x, this.endPosition.x, this.progress);
        this.position.y = lerp(this.startPosition.y, this.endPosition.y, this.progress);

        // Set the color of this star
        fill(this.color + (this.connections * 5));
        // Draw the star
        circle(this.position.x, this.position.y, this.size);
    }
}