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

        // Radius from the center that lines should spawn on
        main.radius = 300;
        // Ending width of all lines
        main.lineWidth = 3;
        // All currently drawn lines
        main.lines = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(windowWidth, windowHeight);

        main.globals();
        sequence.globals();

        noFill();
    }

    static draw() {
        background(0);

        if (frameCount % 8 === 0) {
            sequence.update();
        }

        for (let count = 0; count < 3; count++) {
            if (main.lines.length < 10000) {
                main.lines.push({
                    updateRate: random(0.005, 0.01),
                    angle: radians(random(0, 360)),
                    maxLength: main.radius * 2,
                    color: sequence.getCurrentColor(),
                    //color: color(255),
                    length: 0,
                    width: 0,
                    opacity: 0,
                    progress: 0
                });
            }
        }

        main.lines = main.lines.filter((current) => {
            stroke(current.color, current.opacity);
            strokeWeight(current.width);

            const halfLength = current.length / 2;
            const aboveHalf = main.radius - halfLength;
            const belowHalf = main.radius + halfLength;

            line(
                main.center.x + (belowHalf * cos(current.angle)),
                main.center.y + (belowHalf * sin(current.angle)),
                main.center.x + (aboveHalf * cos(current.angle)),
                main.center.y + (aboveHalf * sin(current.angle))
            );

            current.progress += current.updateRate;
            current.length = lerp(current.maxLength, 0, current.progress);
            current.width = lerp(0, main.lineWidth, current.progress);
            current.opacity = lerp(0, 255, current.progress);

            return current.progress < 1;
        });
    }
}