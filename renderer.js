export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawGrid(grid) {
        this.ctx.fillStyle = '#333';
        grid.mirrors.forEach(mirror => {
            this.ctx.beginPath();
            this.ctx.arc(mirror.x, mirror.y, mirror.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawLaser(laser, thickness) {
        // Draw laser handle
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(laser.position.x, laser.position.y, 10, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw laser path
        laser.path.forEach(segment => {
            this.ctx.strokeStyle = segment.color;
            this.ctx.lineWidth = thickness;
            this.ctx.beginPath();
            this.ctx.moveTo(segment.start.x, segment.start.y);
            this.ctx.lineTo(segment.end.x, segment.end.y);
            this.ctx.stroke();
        });
    }
}