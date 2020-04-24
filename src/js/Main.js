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
            "bouncing-laser"
        ];

        for (const id of Main.projects) {
            // Create the image container
            const container = $("<div>")
                .addClass("project")
                .appendTo($("#project-list"));

            // Make sure the entire container can be clicked on
            const link = $("<a>")
                .addClass("flex flex-justify-center flex-align-center")
                .attr("href", "projects/" + id)
                .appendTo(container);

            const titleString = Main.idToText(id);

            // Set the image
            $("<img>")
                .attr("id", id)
                .attr("src", "src/images/projects/" + id + ".jpg")
                .attr("alt", titleString)
                .appendTo(link);

            // Set the title
            const title = $("<header>")
                .addClass("title bold centered")
                .text(titleString)
                .hide()
                .appendTo(link);

            // Have the title fade in/out on hover
            container.hover(() => {
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