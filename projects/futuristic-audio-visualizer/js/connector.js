class connector {
    static globals() {
        // Color of all connectors
        connector.color = color(20, 100, 230);
        // Angle between each connector in degrees
        connector.angleSpacing = 5;
        // Speed for each connector in degrees
        connector.speed = 0.1;
        // Size of each connector
        connector.size = 5;
        // The chance to start the static animation (1 in x)
        connector.staticMaxChance = 50;
        // Minimum radius increase
        connector.staticMinRadius = 15;
        // Maximum radius increase
        connector.staticMaxRadius = 35;
        // Minimum speed for the animation (0-1)
        connector.staticMinSpeed = 0.05;
        // Maximum speed for the animation (0-1)
        connector.staticMaxSpeed = 0.2;
    }

    progress = 0;

    constructor(angle) {
        this.angle = angle;
        // Set the initial position of the connector
        this.position = this.getPosition();
    }

    draw() {
        // Increment the angle
        this.angle += connector.speed;

        // Get the offsets for this connector's radius
        let offset = 0;
        if (this.static) {
            // Find the offset based on the progress
            offset = lerp(0, this.staticRadius, this.progress);

            // Increment the progress
            this.progress += this.staticSpeed;

            // Check if the connector is returning
            if (this.returning) {
                // Check if the connector has finished the static animation
                if (this.progress <= 0) {
                    // Reset variables
                    this.static = false;
                    this.returning = false;
                }
            } else if (this.progress >= 1) {
                // Mark this connector as returning
                this.returning = true;
                // Invert the static speed
                this.staticSpeed = -this.staticSpeed;
            }
        // Check if this connector should start its static animation
        } else if (round(random(connector.staticMaxChance)) == 1) {
            this.static = true;

            // Set the radius for the animation
            this.staticRadius = round(random(connector.staticMinRadius, connector.staticMaxRadius));
            // Set the speed for the animation
            this.staticSpeed = random(connector.staticMinSpeed, connector.staticMaxSpeed);
        }

        // Update the position
        this.position = this.getPosition(offset);

        // Prevent overflows
        if (this.angle >= 360) {
            this.angle -= 360;
        }

        // Draw the connector
        circle(this.position.x, this.position.y, connector.size);
    }

    getPosition(offset) {
        return {
            x: main.center.x + ((offset + connector.xRadius) * cos(radians(this.angle))),
            y: main.center.y + ((offset + connector.yRadius) * sin(radians(this.angle)))
        };
    }
}