class Main {
    static initialize() {
        // List of all visual project names
        const projects = [
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

        for (let index = 0; index < projects.length; index++) {
            const id = projects[index];

            // Create the image container
            const link = $("<a>")
                .attr("href", "projects/" + id)
                .css("opacity", 0)
                .delay(index * 100)
                .animate({ "opacity": 1 })
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
            link.on("mouseenter", () => title.stop().fadeIn(300))
                .on("mouseleave", () => title.stop().fadeOut(300));
        }
    }

    static idToText(id) {
        let result = "";
        for (const word of id.split("-")) {
            // Capitalize each word and add a space
            result += word[0].toUpperCase() + word.substring(1, word.length) + " ";
        }

        // Remove trailing space
        return result.substring(0, result.length - 1);
    }
}

(() => Main.initialize())();