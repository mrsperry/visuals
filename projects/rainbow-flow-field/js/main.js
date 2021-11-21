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
        main.maxParticles = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        // The max number of particles to add per frame
        main.maxParticlesPerFrame = 2;
        // Perlin noise scale
        main.noiseScale = 0.01;
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        main.globals();
        sequence.globals();
        background(0);
    }

    static draw() {
        background(0, 40);
        for (let index = 0; index < main.maxParticlesPerFrame; index++) {
            if (main.particles.length === main.maxParticles) {
                break;
            }
    
            main.particles.push({
                vector: createVector(random(-10, width + 10), random(-10, height + 10)),
                color: sequence.getCurrentColor(),
                opacity: 0,
                ttl: random(400, 600)
            });
        }
    
        if (frameCount % 30 === 0) {
            sequence.update();
        }
    
        if (frameCount % 750 === 0) {
            noiseSeed(frameCount);
        }
    
        for (const particle of main.particles) {
            stroke(particle.color.levels[0], particle.color.levels[1], particle.color.levels[2], particle.opacity);
    
            const vector = particle.vector;
            if (particle.previous) {
                line(particle.previous.x, particle.previous.y, vector.x, vector.y)
            } else {
                point(vector.x, vector.y);
            }
            particle.previous = createVector(vector.x, vector.y);
            const offset = 2 * TAU * noise(vector.x * main.noiseScale, vector.y * main.noiseScale);
    
            vector.x += cos(offset) * 1.5;
            vector.y += sin(offset) * 1.5;
    
            if (--particle.ttl > 0) {
                if (particle.opacity < 255) {
                    particle.opacity += 5;
                }
            } else {
                particle.opacity -= 5;
            }
    
            if (vector.x > width + 10 || vector.x < -10 || vector.y > height + 10 || vector.y < -10 || (particle.ttl <= 0 && particle.opacity <= 0)) {
                particle.previous = null;
                particle.color = sequence.getCurrentColor();
                particle.opacity = 0;
                particle.ttl = random(200, 400);
                vector.x = random(-10, width + 10);
                vector.y = random(-10, height + 10);
            }
        }
    }
}