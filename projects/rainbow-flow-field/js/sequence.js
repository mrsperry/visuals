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
        // The current index of the sequence
        sequence.colorIndex = 0;
        // The progress of the current transition (0-1)
        sequence.colorProgress = 0;
        // How much progress should be added each frame
        sequence.transitionSpeed = 0.1;
    }

    static update() {
        sequence.colorProgress += sequence.transitionSpeed;

        // Check if the transition has been completed
        if (sequence.colorProgress >= 1) {
            sequence.colorIndex++;

            // Roll over the index if it would be out of bounds
            if (sequence.colorIndex == sequence.colorSequence.length) {
                sequence.colorIndex = 0;
            }

            // Reset the transition progress
            sequence.colorProgress = 0;
        }
    }

    static getCurrentColor() {
        // Get the sequence of colors
        const colors = sequence.colorSequence;

        // Get the next index
        const nextIndex = sequence.colorIndex + 1;
        // Roll over the index if it would be out of bounds
        const truncated = nextIndex == colors.length ? 0 : nextIndex;

        // Get the color levels
        const to = colors[sequence.colorIndex];
        const from = colors[truncated]

        // Get the current color
        return lerpColor(color(to[0], to[1], to[2]), color(from[0], from[1], from[2]), sequence.colorProgress);
    }
}