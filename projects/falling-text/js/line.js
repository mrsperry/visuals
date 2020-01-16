class line {
    static globals() {
        // Base color of each line
        line.color = color(40, 150, 255);
        // Max red offset for the color
        line.maxRedOffset = 0;
        // Max green offset for the color
        line.maxGreenOffset = 30;
        // Max blue offset for the color
        line.maxBlueOffset = 55;

        // Speed of each line (random values have unintended results with spacing)
        line.speed = 10;
        // Spacing of each character on the line (measured in frames)
        line.spacing = 3;
        // Maximum number of characters in a line
        line.maxLength = 15;
        // Time to live on each created character (measured in frames)
        line.previousTTL = 25;
    }

    // Previous characters that are still being drawn
    previous = [];

    constructor(position) {
        this.position = position;

        // Generate this line's color
        const levels = line.color.levels;
        this.color = color(levels[0] - random(line.maxRedOffset), levels[1] - random(line.maxGreenOffset), levels[2] - random(levels.maxBlueOffset));
    }

    update() {
        // Update this line's position
        this.position.y += line.speed;

        if (frameCount % line.spacing == 0) {
            // Add a new character to the line
            this.char = String.fromCharCode(Math.round(random(48, 126)));
            
            this.previous.push({
                char: this.char,
                y: this.position.y,
                ttl: line.previousTTL
            });

            // Remove any characters over the max limit
            if (this.previous.length > line.maxLength) {
                this.previous.splice(0, 1);
            }
        }
        
        // Draw the new character
        fill(this.color);
        text(this.char, this.position.x, this.position.y);

        // Draw the rest of the previous characters
        for (let index = 1; index < this.previous.length; index++) {
            let item = this.previous[index];

            // Reduce this character's time to live
            item.ttl--;

            // Generate this character's color with opacity
            const levels = this.color.levels;
            let opacity = color(levels[0], levels[1], levels[2], item.ttl * 20);

            fill(opacity);
            text(item.char, this.position.x, item.y);
        }
    }
}