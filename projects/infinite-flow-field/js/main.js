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

        // The vectors that are being drawn as particles
        main.particles = [];
        // The number of particles being drawn
        main.maxParticles = 1000;
        // The max number of particles to add per frame
        main.maxParticlesPerFrame = 2;
        // Perlin noise scale
        main.noiseScale = 0.01;
        // The main hue to use
        main.hue = random(360);
        // Overall speed multiplier of the drawing
        main.simulationSpeed = 1;
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        main.globals();
        sequence.globals();
        colorMode(HSL, 360, 100, 100, 255);
        background(0);
    }

    static draw() {
        for (let index = 0; index < main.maxParticlesPerFrame; index++) {
            if (main.particles.length === main.maxParticles) {
                break;
            }

            main.particles.push({
                vector: createVector(random(-10, width + 10), random(-10, height + 10)),
                color: color(random(main.hue - 20, main.hue + 20), 100, random(40, 60)),
                opacity: 0,
                ttl: random(200, 400)
            });
        }

        for (let index = 0; index < main.simulationSpeed; index++) {
            for (const particle of main.particles) {
                stroke(hue(particle.color), saturation(particle.color), lightness(particle.color), particle.opacity);

                const vector = particle.vector;
                if (particle.previous) {
                    line(particle.previous.x, particle.previous.y, vector.x, vector.y)
                } else {
                    circle(vector.x, vector.y);
                }
                particle.previous = createVector(vector.x, vector.y);
                const offset = 2 * TAU * noise(vector.x * main.noiseScale, vector.y * main.noiseScale);

                vector.x += cos(offset);
                vector.y += sin(offset);

                if (--particle.ttl > 0) {
                    if (particle.opacity < 150) {
                        particle.opacity += 5;
                    }
                } else {
                    particle.opacity -= 5;
                }

                if (vector.x > width + 10 || vector.x < -10 || vector.y > height + 10 || vector.y < -10 || (particle.ttl === 0 && particle.opacity <= 0)) {
                    particle.previous = null;
                    particle.opacity = 0;
                    particle.ttl = 300;
                    vector.x = random(-10, width + 10);
                    vector.y = random(-10, height + 10);
                }
            }
        }
    }
}