class cube {
    // Dimensions of each cube in pixels
    static cubeDimensions = 15;
    // How many pixels are placed between each cube
    static cubeSpacing = 3;
    // Total width of each cube
    static cubeSize = cube.cubeDimensions + cube.cubeSpacing;
    // The multiplier used when determining levels
    static levelMultiplier = 15;
    // The multiplier used when determining tip color
    static tipMultipiler = 2;
    // The minimum number of cubes to be generated below the maximum
    static minLevels = 7;
    // The outer color of the visualizer
    static innerColor = [255, 0, 0];
    // The inner color of the visualizer
    static outerColor = [0, 0, 255];
    // The tip color of the visualizer
    static tipColor = [255, 255, 0];

    constructor(position) {
        this.position = position;

        // Gets a percentage (0-1) from the start point to center of the screen
        const getPercentage = (start) => {
            if (start > main.center) {
                // Subtract half of the screen width
                start -= main.center;
                // Get the absolute value since subtracting 1 will make the number negative
                return abs((start / main.center) - 1);
            } else {
                return start / main.center;
            }
        }

        // Set the max number of levels this cube can have at once, based on how close to the center this cube is
        this.max = getPercentage(this.position.x + (cube.cubeDimensions / 2)) * cube.levelMultiplier;

        // Make sure the cube can always have at least one additional level
        if (this.max < 2) {
            this.max = 2;
        }

        // Check if the max number of levels is greater than the height of the screen
        if (this.max > cube.maxLevels) {
            this.max = cube.maxLevels;
        }

        // Generate colors
        const minColor = color(cube.outerColor[0], cube.outerColor[1], cube.outerColor[2]);
        const maxColor = color(cube.innerColor[0], cube.innerColor[1], cube.innerColor[2]);
        // Get the color percentage to use for lerping
        const percentage = getPercentage(this.position.x);

        // Set the color of this cube
        this.color = lerpColor(minColor, maxColor, percentage);
        // Set the tip color
        this.tipColor = color(cube.tipColor[0], cube.tipColor[1], cube.tipColor[2]);
    }

    draw() {
        // Get the minimum number of levels this cube can have
        const minLevels = this.max - cube.minLevels;
        // Get the actual number of levels this cube will have this cycle
        const levels = round(random(minLevels > 0 ? minLevels : 0, this.max));

        // Draw the cube
        fill(this.color);
        rect(this.position.x, this.position.y, cube.cubeDimensions, cube.cubeDimensions);

        // Draw the additional levels
        for (let index = 0; index < levels; index++) {
            // Get the y coordinate of this level
            const y = cube.cubeSize * index;

            // Find the color of this level based on how high it is
            fill(lerpColor(this.tipColor, this.color, window.innerHeight / (this.position.y + y) / cube.tipMultipiler));

            // Draw the levels
            rect(this.position.x, this.position.y + y, cube.cubeDimensions, cube.cubeDimensions);
            rect(this.position.x, this.position.y - y, cube.cubeDimensions, cube.cubeDimensions);
        }
    }
}