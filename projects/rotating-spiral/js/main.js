function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Set the center of the screen
        main.center = createVector(round(window.innerWidth / 2), round(window.innerHeight / 2));

        // Emitter radius
        main.emitterRadius = 10;
        // Emitter cooldown
        main.emitterCooldown = 25;
        // Emitter speed
        main.emitterSpeed = 0.5;
        // Create two opposing emitters
        main.emitters = [{ angle: 0 }, { angle: 180 }];
        // Size of all points
        main.pointSize = 5;
        // All currently drawn points
        main.points = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(windowWidth, windowHeight);

        main.globals();

        noStroke();
        fill(255);
    }

    static draw() {
        background(0);

        main.emitters.map((emitter) => {
            const x = main.center.x + (main.emitterRadius * cos(radians(emitter.angle)));
            const y = main.center.y + (main.emitterRadius * sin(radians(emitter.angle)));
            circle(x, y, main.pointSize);

            // Update the emitters
            emitter.angle += main.emitterSpeed;
            if (emitter.angle >= 360) {
                emitter.angle = 0;
            }
        });

        if (frameCount % main.emitterCooldown == 0) {
            main.points.push({
                // Swap between emitters after every fire
                angle: main.emitters[frameCount % (main.emitterCooldown * 2) == 0 ? 1 : 0].angle,
                radius: main.emitterRadius,
                acceleration: 0
            });
        }

        main.points = main.points.filter((point) => {
            const x = main.center.x + (point.radius * cos(radians(point.angle)));
            const y = main.center.y + (point.radius * sin(radians(point.angle)));
            circle(x, y, main.pointSize);

            // Increase this point's acceleration
            if (point.acceleration < 0.3) {
                point.acceleration += 0.001;
            }
            // Update angle and radius
            point.angle += point.acceleration;
            point.radius += point.acceleration;

            const max = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
            return (point.radius + main.pointSize) < max;
        });
    }
}