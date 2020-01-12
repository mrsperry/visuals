class light {
    // Chance to create a tipped light (0-1)
    static tippedChance = 0.1;
    // Minimum speed the light must be going to be tipped
    static minimumTipSpeed = 0.7;
    // Minimum tip length in pixels
    static minTipLength = 50;
    // Maximum tip length in pixels
    static maxTipLength = 15;
    // Maximum color offset (0-255)
    static maxColorOffset = 35;

    constructor(position) {
        // Set a random position along the top of the screen
        this.position = position;
        // Set a random speed
        this.speed = random(0.2, 2);
        // Set a random color offset
        this.colorOffset = round(random(0, light.maxColorOffset));

        // Determine if this light should have a white tip
        this.tipped = this.speed >= light.minimumTipSpeed ? random() <= light.tippedChance : false;
        if (this.tipped) {
            // Set a random tip length
            this.tipLength = round(random(light.minTipLength, light.maxTipLength));
            // Calculcate the increment for the tip length
            this.tipIncrement = (100 / this.tipLength) / 100;
        }
    }

    draw() {
        // Increment this lights progress
        this.position.y += this.speed;

        // Get the selected and previously selected colors
        const colors = sequence.getColors(this.colorOffset);
        const previousColors = sequence.previousColors;

        // Get half of the screen's width
        const half = window.innerWidth / 2;

        let lerp;
        if (sequence.transition) {
            // Lerp colors based on the sequence change percentage
            if (this.position.x > half) {
                lerp = lerpColor(
                    lerpColor(previousColors[1], colors[1], sequence.transitionPercent), 
                    lerpColor(previousColors[2], colors[2], sequence.transitionPercent),
                    (this.position.x - half) / half);
            } else {
                lerp = lerpColor(
                    lerpColor(previousColors[0], colors[0], sequence.transitionPercent), 
                    lerpColor(previousColors[1], colors[1], sequence.transitionPercent), 
                    this.position.x / half);
            }
        } else {
            // Lerp colors based solely on distance
            if (this.position.x > half) {
                lerp = lerpColor(colors[1], colors[2], (this.position.x - half) / half);
            } else {
                lerp = lerpColor(colors[0], colors[1], this.position.x / half);
            }
        }

        // Calculate the percent (0-1) of this lights progress
        const percent = this.position.y / round(window.innerHeight * 1.2);
        // Check if this light has reached its max value
        if (percent >= 1) {
            // Mark this light for removal
            this.completed = true;
            return;
        }

        // Calculate the end of the line if it is tipped
        const end = this.position.y - (this.tipped ? this.tipLength : 0);
        if (end >= 0) {
            // Draw the line
            stroke(lerpColor(lerp, color(0), percent));
            line(this.position.x, 0, this.position.x, end);
        }

        if (this.tipped) {
            for (let index = 0; index < this.tipLength; index++) {
                // Set the tip color
                stroke(lerpColor(lerpColor(lerp, color(255), this.tipIncrement * index), color(0), percent));
                // Draw the tip
                line(this.position.x, this.position.y - (this.tipLength - index), this.position.x, this.position.y);
            }
        }
    }
}