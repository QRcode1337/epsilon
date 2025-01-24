import { Vector2 } from '../core/Vector2.js';
import { Physics } from '../core/Physics.js';

export class Laser {
    constructor() {
        this.position = new Vector2();
        this.direction = new Vector2(1, 0);
        this.path = [];
        this.maxBounces = 100;
        this.currentHue = 0;
    }

    updateDirection(target) {
        const direction = target.subtract(this.position);
        this.direction = direction.normalize();
    }

    calculatePath(mirrors, canvasSize) {
        this.path = [];
        let currentPos = new Vector2(this.position.x, this.position.y);
        let currentDir = new Vector2(this.direction.x, this.direction.y);
        this.currentHue = 0;

        for (let i = 0; i < this.maxBounces; i++) {
            const collision = this.findFirstCollision(currentPos, currentDir, mirrors, canvasSize);
            if (!collision) break;

            this.path.push({
                start: currentPos,
                end: collision.point,
                color: `hsl(${this.currentHue}, 100%, 50%)`
            });

            currentPos = collision.point;
            currentDir = Physics.calculateReflection(currentDir, collision.normal);
            this.currentHue = (this.currentHue + 15) % 360;
        }
    }

    findFirstCollision(origin, direction, mirrors, canvasSize) {
        let nearestCollision = null;
        let minDistance = Infinity;

        // Check canvas boundaries
        const canvasCollision = this.checkCanvasCollision(origin, direction, canvasSize);
        if (canvasCollision && canvasCollision.distance < minDistance) {
            nearestCollision = canvasCollision;
            minDistance = canvasCollision.distance;
        }

        // Check mirrors
        for (const mirror of mirrors) {
            const collision = Physics.rayCircleIntersection(
                origin,
                direction,
                new Vector2(mirror.x, mirror.y),
                mirror.radius
            );
            
            if (collision && collision.distance < minDistance) {
                nearestCollision = collision;
                minDistance = collision.distance;
            }
        }

        return nearestCollision;
    }

    checkCanvasCollision(origin, direction, { width, height }) {
        // Detailed boundary collision detection
        const intersections = [];
        
        // Check all four boundaries
        const boundaries = [
            { normal: new Vector2(0, -1), position: 0 }, // Top
            { normal: new Vector2(0, 1), position: height }, // Bottom
            { normal: new Vector2(-1, 0), position: 0 }, // Left
            { normal: new Vector2(1, 0), position: width } // Right
        ];

        for (const boundary of boundaries) {
            const t = (boundary.position - (boundary.normal.y !== 0 ? origin.y : origin.x)) /
                      (boundary.normal.y !== 0 ? direction.y : direction.x);
            
            if (t > 0) {
                const point = origin.add(direction.multiply(t));
                if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
                    intersections.push({
                        point,
                        normal: boundary.normal,
                        distance: t
                    });
                }
            }
        }

        return intersections.reduce((nearest, current) => 
            current.distance < (nearest?.distance || Infinity) ? current : nearest, null);
    }
}