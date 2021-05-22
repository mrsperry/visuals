class coloredArc {
    static globals() {
        coloredArc.baseSpeed = 1;
        coloredArc.speedIncrease = 0.1;
    }

    constructor(radius, offset, speed, color, startAngle) {
        this.radius = radius;
        this.offset = offset;
        this.speed = speed;
        this.color = color;
        this.angle = startAngle
    }

    draw() {
        this.angle += this.speed;

        stroke(this.color[0], this.color[1], this.color[2]);
        arc(main.center.x, main.center.y, this.offset, this.offset, this.angle - this.radius, this.angle + this.radius);
    }
}