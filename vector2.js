export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    normalize() {
        const mag = this.magnitude;
        return mag > 0 ? this.multiply(1 / mag) : new Vector2();
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    reflect(normal) {
        const dot = this.dot(normal);
        return new Vector2(
            this.x - 2 * dot * normal.x,
            this.y - 2 * dot * normal.y
        );
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }

    static fromAngle(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}