class sequence {
    static globals() {
        // All sequence colors, in order
        sequence.colorSequence = [
            // Red - Orange - Yellow
            [255, 0, 0], [255, 128, 0], [255, 255, 0],
            // Lime Green - Green - Aquamarine
            [128, 255, 0], [0, 255, 0], [0, 255, 128],
            // Teal - Light Blue - Blue
            [0, 255, 255], [0, 128, 255], [0, 0, 255],
            // Violet - Purple - Magenta
            [128, 0, 255], [255, 0, 255], [255, 0, 128]
        ];
        // The color to be displayed in the center of the screen
        sequence.index = 0;
        // The previous color displayed in the center (used for transitions)
        sequence.previousIndex = sequence.index;
        // If a color transition is currently happening
        sequence.transition = false;
        // Current percentage (0-1) of the transition
        sequence.transitionPercent = 0;
        // Speed at which transitions between colors should occur
        sequence.transitionSpeed = 0.001;
        // Frame interval when a new color is selected if a transition is not in progress
        sequence.sequenceInterval = 500;

        // Selected colors
        sequence.colors = [];
        // Previously selected colors
        sequence.previousColors = [];
    }

    static update() {
        // Check if a current transition is complete
        if (sequence.transitionPercent >= 1) {
            sequence.transition = false;
        } else {
            // Increment the transition percent
            sequence.transitionPercent += sequence.transitionSpeed;
        }
    
        // Only start a new transition if the old one has completed
        if (!sequence.transition) {
            // Check if a new color should be selected
            if (frameCount % sequence.sequenceInterval == 0) {
                // Reset variables
                sequence.previousIndex = sequence.index++;
                sequence.transition = true;
                sequence.transitionPercent = 0;
    
                // Roll over the index so it is never out of bounds
                if (sequence.index == sequence.colorSequence.length) {
                    sequence.index = 0;
                }

                // Reset the selected colors
                sequence.setColors();
            }
        }
    }

    static setColors() {
        const truncateIndex = (index) => {
            if (index < 0) {
                // Roll over to the end of the list if the index is below 0
                return sequence.colorSequence.length - 1;
            } else if (index == sequence.colorSequence.length) {
                // Roll over to the beginning of the list if the index is above the last element's index
                return 0;
            } else {
                // Otherwise get the color at this index
                return index;
            }
        }

        // Reset new and previous colors
        for (let index = 0; index < 3; index++) {
            // Reset previous colors
            sequence.previousColors[index] = sequence.colors[index];

            // Get the levels of the new colors
            const levels = sequence.colorSequence[truncateIndex(sequence.index + (index - 1))];
            // Set the color
            sequence.colors[index] = color(levels[0], levels[1], levels[2]);
        }
    }

    static getColors(maxOffset) {
        const colors = [];

        for (let current of sequence.colors) {
            // Get the levels of the current color
            const levels = [current._getRed(), current._getGreen(), current._getBlue()];

            // Offset RGB
            for (let index = 0; index < 3; index++) {
                let level = levels[index];

                // Only offset this level if it is non-zero
                if (level > 0) {
                    // Make sure the level cannot go under 0
                    levels[index] = level - round(random(0, level < maxOffset ? level : maxOffset));
                }
            }

            // Create the new color
            colors.push(color(levels[0], levels[1], levels[2]));
        }

        return colors;
    }
}