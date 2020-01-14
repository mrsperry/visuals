function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // The maximum number of stars allowed on screen at once
        main.maxStars = 100;
        // The cooldown timer to add new stars, preventing stalls in new spawns
        main.spawnCooldown = 5;

        // The current stars
        main.stars = [];
    }

    static setup() {
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        star.globals();
    }

    static draw() {
        // Clear the screen
        background(0);

        // Check if the cooldown has expired
        if (frameCount % main.spawnCooldown == 0) {
            // Check if the max number of stars has been reached
            if (main.stars.length < main.maxStars) {
                // Add a new star
                main.stars.push(new star());
            }
        }

        // Create a list of star connections
        const connections = [];
        main.stars.map(item => {
            // Reset this star's connections
            item.connections = 0;

            for (const current of main.stars) {
                // Skip over this star as it can't connect to itself
                if (current == item) {
                    continue;
                }

                // Get the distance between this star and the comparing star
                const distance = dist(item.position.x, item.position.y, current.position.x, current.position.y);
                // Check if stars can connect
                if (distance <= star.connectorRadius) {
                    // Add this connection
                    connections.push({
                        star1: item,
                        star2: current,
                        // Calculate the color based on the distance
                        color: lerpColor(color(0), color(255), (star.connectorRadius - distance) / star.connectorRadius)
                    })

                    // Increase this star's connections
                    item.connections += 1;
                }
            }
        });

        // Sort connections by color value, lower being drawn first (only check red level since connectors are grayscale)
        connections.sort((star1, star2) => star1.color.levels[0] - star2.color.levels[0]);
        // Draw all connections (must happen before stars are drawn or they will overlap)
        connections.map(data => {
            stroke(data.color);
            line(data.star1.position.x, data.star1.position.y, data.star2.position.x, data.star2.position.y);
        });

        noStroke();
        // Draw all stars
        main.stars = main.stars.filter(star => {
            star.draw();
            return star.progress <= 1;
        });
    }
}