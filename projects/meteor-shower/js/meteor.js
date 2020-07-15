class meteor {
    static globals() {
        // The size constraints
        meteor.minSize = 0.5;
        meteor.maxSize = 1.5;
        // The speed constraints
        meteor.minSpeed = 0.001;
        meteor.maxSpeed = 0.005;
        // The opacity constraints (lower = shorter trail and dimmer)
        meteor.minOpacity = 150;
        meteor.maxOpacity = 255;
        // The progress threshold at which the meteor will hit its target opaqueness
        // Meteors spawn with an opacity of 0 and lerp to their target opacity based on this number
        meteor.opacityThreshold = 0.5;
    }

    constructor() {
        // Set the starting position to the center of the screen
        this.position = createVector(main.center.x, main.center.y);
        this.start = main.center;
        // Create an end point outside of the screen
        this.end = this.generateEndPoint();
        // Set the size
        this.size = random(meteor.minSize, meteor.maxSize);
        // Set the progress variables
        this.progress = 0;
        this.speed = random(meteor.minSpeed, meteor.maxSpeed);
        this.opacity = 0;
        this.targetOpacity = random(meteor.minOpacity, meteor.maxOpacity);
    }

    draw() {
        // Update the meteor's progress
        this.progress += this.speed;

        // Check if the meteor's target opacity has been reached
        if (this.opacity < this.targetOpacity) {
            // Set the opacity to a value between 0 and the target opacity
            // The target opacity will be reached when the progress >= opacity threshold
            this.opacity = round(this.targetOpacity * (this.progress / meteor.opacityThreshold));
        } else {
            this.opacity = this.targetOpacity;
        }

        // Move the meteor
        this.position.x = lerp(this.start.x, this.end.x, this.progress);
        this.position.y = lerp(this.start.y, this.end.y, this.progress);

        // Draw the meteor
        fill(255, 255, 255, this.opacity);
        circle(this.position.x, this.position.y, this.size);
    }

    generateEndPoint() {
        const end = createVector();

        // Determine which axis the end point will sit on
        const axis = round(random()) == 0;
        // Determine which direction the end point will go
        const direction = round(random()) == 0;

        // Generate a random point along the edges of the screen
        if (axis) {
            end.x = round(random(0, window.innerWidth));
            end.y = direction ? 0 : window.innerHeight;
        } else {
            end.x = direction ? 0 : window.innerWidth;
            end.y = round(random(0, window.innerHeight));
        }

        return end;
    }
}