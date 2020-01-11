class light {
    // Radius of the lights
    static lightRadius = 3;
    // Lowest max speed of a light
    static minLightSpeed = 0.015;
    // Highest max speed of a light
    static maxLightSpeed = 0.02;
    // The acceleration speed of all lights until they hit their max speed
    static acceleration = 0.001;
    // How far in the lights should spawn in comparison to the hole radius
    static animationSpawnRadius = 5;
    // How fast the spawn animation should play
    static animationSpeed = 0.1;

    // If the spawn animation has been completed
    animationComplete = false;
    // The progress percentage (0-1) of this light's spawn animation
    animationProgress = 0;

    // The current speed of the light
    speed = 0;
    // The max speed of the light
    maxSpeed = random(light.minLightSpeed, light.maxLightSpeed);
    // The progress percentage (0-1) of this light's path
    progress = 0;

    constructor() {
        // Get a random angle to spawn this light
        const angle = radians(random(0, 360));

        // Get the spawn position of this light
        const x = main.center.x + ((main.radius - light.animationSpawnRadius) * cos(angle));
        const y = main.center.y + ((main.radius - light.animationSpawnRadius) * sin(angle));

        // Set the spawn and current positions to the spawn coordinates
        this.position = {
            x: x, 
            y: y
        };
        this.spawnPosition = {
            x: x,
            y: y
        }

        // Set the starting position for this light (used after spawn animation)
        this.startPosition = {
            x: main.center.x + (main.radius * cos(angle)),
            y: main.center.y + (main.radius * sin(angle))
        };

        // Set the color of this light
        this.color = sequence.getCurrentColor();
    }

    draw() {
        // Get the start and end positions the lerp function will use
        let start = this.startPosition;
        let end = main.center;
        let progress = this.progress;

        // Set the fill color for this light
        fill(this.color);

        // Override lerp variables to use animation values
        if (!this.animationComplete) {
            start = this.spawnPosition;
            end = this.startPosition;
            progress = this.animationProgress;

            this.animationProgress += light.animationSpeed;

            // Fade from black to this light's color based on the animation progress
            fill(lerpColor(color(0), this.color, this.animationProgress));

            if (progress >= 1) {
                this.animationComplete = true;
            }
        } else {
            // Start the light off slow until it reaches its max speed
            if (this.speed <= this.maxSpeed) {
                this.speed += light.acceleration;
            } else if (this.speed != this.maxSpeed) {
                this.speed = this.maxSpeed;
            }

            this.progress += this.speed;
        }

        // Update this light's position
        this.position.x = lerp(start.x, end.x, progress);
        this.position.y = lerp(start.y, end.y, progress);

        // Draw the light
        circle(this.position.x, this.position.y, light.lightRadius);
    }
}