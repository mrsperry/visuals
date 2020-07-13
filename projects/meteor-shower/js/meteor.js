class meteor {
    static globals() {
        meteor.minSpeed = 0.001;
        meteor.maxSpeed = 0.005;
        meteor.minOpacity = 150;
        meteor.maxOpacity = 255;
        meteor.opacityThreshold = 0.5;
    }

    constructor() {
        this.position = createVector(main.center.x, main.center.y);
        this.start = main.center;
        this.end = this.generateEndPoint();
        this.progress = 0;
        this.opacity = 0;
        this.targetOpacity = random(meteor.minOpacity, meteor.maxOpacity);
        this.speed = random(meteor.minSpeed, meteor.maxSpeed);
    }

    draw() {
        this.progress += this.speed;
        if (this.opacity < this.targetOpacity) {
            this.opacity = round(this.targetOpacity * (this.progress / meteor.opacityThreshold));
        } else {
            this.opacity = this.targetOpacity;
        }

        this.position.x = lerp(this.start.x, this.end.x, this.progress);
        this.position.y = lerp(this.start.y, this.end.y, this.progress);

        fill(255, 255, 255, this.opacity);
        circle(this.position.x, this.position.y, 1);
    }

    generateEndPoint() {
        const end = createVector();
        const axis = round(random()) == 0;
        const direction = round(random()) == 0;

        if (axis) {
            end.x = round(random(0, window.innerWidth));
            end.y = direction ? 0 : window.innerHeight;
        } else {
            end.x = direction ? 0 : window.innerWidth;
            end.y = round(random(0, window.innerHeight));
        }

        return end;
    }
}