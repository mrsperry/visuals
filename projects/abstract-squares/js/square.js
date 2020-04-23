class square {
    static globals() {
        // Diameter of the smallest square that can be generated
        square.baseSize = 10;
        // How many tiles a small square will fill
        square.smallSize = 1;
        // How many tiles a medium square will fill
        square.mediumSize = 2;
        // How many tiles a large square will fill
        square.largeSize = 4;
        // The number of pixels between each square
        square.divider = 5;
        // The total size each square takes up
        square.totalSize = square.baseSize + square.divider;
        // Colors the squares can randomly pick from
        square.colors = [
            color(73, 157, 188), 
            color(104, 146, 193), 
            color(136, 122, 201),
            color(214, 134, 208),
            color(244, 148, 198)
        ];
    }

    constructor(x, y, size) {
        // Set the size of the square, including spacing if a square will take up more than 1 tile
        this.size = size * square.baseSize + (square.divider * (size - 1));
        // Set the position 
        this.position = {
            x: x,
            y: y
        };
        // Select a random color
        this.color = square.colors[main.random(0, square.colors.length)];

        // Draw the square initially so the positioning can check for non blank pixels
        this.draw();
    }

    draw() {
        fill(this.color);
        rect(this.position.x, this.position.y, this.size, this.size);
    }
}