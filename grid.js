export class Grid {
    constructor() {
        this.mirrors = [];
        this.spacing = 60;
        this.mirrorRadius = 12;
    }

    generate(canvasWidth, canvasHeight, rows, cols) {
        this.mirrors = [];
        const startX = (canvasWidth - (cols - 1) * this.spacing) / 2;
        const startY = (canvasHeight - (rows - 1) * this.spacing) / 2;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.mirrors.push({
                    x: startX + j * this.spacing,
                    y: startY + i * this.spacing,
                    radius: this.mirrorRadius
                });
            }
        }
    }
}