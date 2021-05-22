function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Set the center of the screen
        main.center = {
            x: round(window.innerWidth / 2),
            y: round(window.innerHeight / 2)
        };

        // Current arcs
        main.arcs = [];

        const colors = [
            // Red - Orange - Yellow
            [255, 0, 0], [255, 128, 0], [255, 255, 0],
            // Lime Green - Green - Aquamarine
            [128, 255, 0], [0, 255, 0], [0, 255, 128],
            // Teal - Light Blue - Blue
            [0, 255, 255], [0, 128, 255], [0, 0, 255],
            // Violet - Purple - Magenta
            [128, 0, 255], [255, 0, 255], [255, 0, 128]
        ];
        for (const startAngle of [0, 90]) {
            for (let index = -colors.length + 1; index < colors.length; index++) {
                const absolute = abs(index);

                const radius = 3 + (absolute * 0.25);
                const offset = 1 + (absolute * 85);
                const speed = coloredArc.baseSpeed + (coloredArc.speedIncrease * absolute);
                const color = colors[absolute];
                const isFlipped = index < 0;

                main.arcs.push(new coloredArc(radius, offset, speed, color, startAngle + (isFlipped ? 180 : 0)));
            }
        }
    }

    static setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        angleMode(DEGREES);
        strokeWeight(3);

        // Set globals
        coloredArc.globals();
        main.globals();
    }

    static draw() {
        // Clear the screen
        background(0);

        noFill();
        for (const arc of main.arcs) {
            arc.draw();
        }
    }
}