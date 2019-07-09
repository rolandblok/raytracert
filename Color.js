class Color extends THREE.Color {
    constructor(r, g, b) {
        super(r, g, b);
    }

    add(color) {
        this.r = Math.min(1.0, this.r+color.r);
        this.g = Math.min(1.0, this.g+color.g);
        this.b = Math.min(1.0, this.b+color.b);
        return this
    }
}