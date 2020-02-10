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
            "rotating-spiral"
        ];

        for (const name of Main.projects) {
            // Create the image container
            const container = $("<div>")
                .addClass("project")
                .appendTo($("#project-list"));

            // Make sure the entire container can be clicked on
            const link = $("<a>")
                .addClass("flex flex-justify-center flex-align-center")
                .attr("href", "projects/" + name)
                .appendTo(container);

            // Set the image
            $("<img>")
                .attr("id", name)
                .attr("src", "src/images/" + name + ".png")
                .appendTo(link);

            // Set the title
            const title = $("<div>")
                .addClass("title bold centered")
                .text(Main.idToText(name))
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
            // Capatalize the word and add a space
            result += word[0].toUpperCase() + word.substring(1, word.length) + " ";
        }

        // Remove trailing space
        return result.substring(0, result.length - 1);
    }
}