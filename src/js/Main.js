class Main {
    static initialize() {
        // List of all visual project names
        Main.projects = [
            "falling-lights",
            "geometric-constellations",
            "rainbow-black-hole",
            "cubic-audio-visualizer",
            "falling-text",
            "reaching-arms",
            "raindrops",
            "futuristic-audio-visualizer",
            "rotating-spiral",
            "random-walkers",
            "abstract-squares",
            "bouncing-laser",
            "gradient-circuit",
            "meteor-shower"
        ];

        for (const id of Main.projects) {
            // Create the image container
            const link = $("<a>")
                .attr("href", "projects/" + id)
                .appendTo(".projects");

            const titleString = Main.idToText(id);

            // Set the image
            $("<img>")
                .attr("id", id)
                .attr("src", "projects/" + id + "/preview.jpg")
                .attr("alt", titleString)
                .appendTo(link);

            // Set the title
            const title = $("<span>")
                .text(titleString)
                .appendTo(link);

            // Have the title fade in/out on hover
            link.hover(() => {
                title.stop().fadeIn(300);
            }, () => {
                title.stop().fadeOut(300);
            });
        }
    }

    static idToText(id) {
        let result = "";
        for (const word of id.split("-")) {
            // Capitalize the word and add a space
            result += word[0].toUpperCase() + word.substring(1, word.length) + " ";
        }

        // Remove trailing space
        return result.substring(0, result.length - 1);
    }
}

(() => {
    Main.initialize();
})();