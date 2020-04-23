function setup() {
    main.setup();
}

function draw() {
    main.draw();
}

class main {
    static globals() {
        // Scale of the Perlin noise used to determine the position of the squares
        main.noiseScale = 0.5;
        // The squares on screen
        main.squares = [];
    }

    static setup() {
        // Create the canvas
        createCanvas(window.innerWidth, window.innerHeight);

        // Set globals
        main.globals();
        square.globals();

        background(0);
        noStroke();

        // Initial offsets of square position to center the squares on screen for better visual appeal (no hugging)
        const xOffset = round(((window.innerWidth % square.totalSize) / 2) + (square.divider / 2));
        const yOffset = round(((window.innerHeight % square.totalSize) / 2) + (square.divider / 2));
        // The total number of squares that can appear on an axis
        const xTotal = floor(window.innerWidth / square.totalSize);
        const yTotal = floor(window.innerHeight / square.totalSize);

        for (let x = 0; x < xTotal; x++) {
            for (let y = 0; y < yTotal; y++) {
                // Get the in-canvas coordinates
                const realX = xOffset + (x * 15);
                const realY = yOffset + (y * 15);

                // Get the noise value at the current coordinates
                const noiseValue = noise(x * main.noiseScale, y * main.noiseScale);

                // Create a square based on the noise value
                if (noiseValue > 0.45) {
                    continue;
                } else if (noiseValue > 0.25) {
                    if (main.checkColor(realX, realY, square.smallSize) && this.checkPosition(x, y, xTotal, yTotal, square.smallSize)) {
                        main.squares.push(new square(realX, realY, square.smallSize));
                    }
                } else if (noiseValue > 0.15) {
                    if (main.checkColor(realX, realY, square.mediumSize) && this.checkPosition(x, y, xTotal, yTotal, square.mediumSize)) {
                        main.squares.push(new square(realX, realY, square.mediumSize));
                    }
                } else {
                    if (main.checkColor(realX, realY, square.largeSize) && this.checkPosition(x, y, xTotal, yTotal, square.largeSize)) {
                        main.squares.push(new square(realX, realY, square.largeSize));
                    }
                }
            }
        }
    }

    static draw() {
        // Clear the screen
        background(0);

        main.squares.map((square) => {
            square.draw();
        });
    }

    static checkColor(x, y, size) {
        const compare = (coords) => {
            // Get the pixel at the given coordinates
            const colors = get(coords.x, coords.y);
            // Check if this pixel is black (empty)
            if (colors[0] != 0 || colors[1] != 0 || colors[2] != 0) {
                return true;
            }
        };

        for (let index = 0; index < size; index++) {
            // Check the coordinates to the right of the origin
            const horizontal = {
                x: x + (square.totalSize * index),
                y: y
            };
            // Check the coordinates to the bottom of the origin
            const vertical = {
                x: x,
                y: y + (square.totalSize * index)
            };
            
            if (compare(horizontal) || compare(vertical)) {
                return false;
            }
        }

        return true;
    }

    static checkPosition(xIndex, yIndex, xMax, yMax, size) {
        // Reduce the size by 1 to respect 0 indexing
        size -= 1;
        // Check if the square would go outside the bounds of the max squares in the row/column
        return xIndex + size < xMax && yIndex + size < yMax;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}