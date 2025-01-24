import { Vector2 } from './Vector2.js';

export class Physics {
    static rayCircleIntersection(rayOrigin, rayDir, circleCenter, circleRadius) {
        const toCircle = circleCenter.subtract(rayOrigin);
        const projection = toCircle.dot(rayDir);
        const closestApproach = rayOrigin.add(rayDir.multiply(projection));
        
        const distanceToCenter = closestApproach.subtract(circleCenter).magnitude;
        if (distanceToCenter > circleRadius) return null;

        const delta = Math.sqrt(circleRadius ** 2 - distanceToCenter ** 2);
        const t = projection - delta;
        
        if (t < 0) return null;

        return {
            point: rayOrigin.add(rayDir.multiply(t)),
            normal: closestApproach.subtract(circleCenter).normalize(),
            distance: t
        };
    }

    static calculateReflection(incident, normal) {
        return incident.reflect(normal);
    }
}