/*
 * GradientLines
 *
 * (c) Joonas Reinikka 2019
 */

export default class GradientLines {
    constructor(canvasElement, width, height) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.width = width;
        this.height = height;

        canvasElement.width = width;
        canvasElement.height = height;

        // Public, change these!
        this.speed = 2;
        this.subLineSize = 3;
        this.startY = height / 3;
        this.colorSpeed = 100;
        this.colorChangeSpeed = 0.08;
        this.colorChangeDelay = 0.5;
        this.color = 0;

        // Private, don't change these
        this._lastDrawn = 0;
        this._lines = [];
        this._colorRound = 0;
        this._colorChangeCounter = 0;

        this.initLines();
    }

    initLines() {
        // Lines are actually 5 small lines per line
        let linePos = this.startY;
        let light = 30;
        this.lines = [];
        for (let j = 0; j < 5; j++) {
            this.lines.push({
                width: this.subLineSize,
                y: linePos,
                color: this.color,
                light: light,
                lightPos: true,
            });
            linePos += this.subLineSize;
            light += 90 / 5;
        }
        light = 30;
        linePos += 1;
    }

    HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }

    update() {
        // Lines
        this.lines.map((line, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, line.y);
            this.ctx.lineTo(this.canvas.width, line.y);

            const color = this.HSVtoRGB(line.color / 360, 0, line.light / 100);
            this.ctx.strokeStyle = `rgb(${color.r},${color.g}, ${color.b})`;
            this.ctx.lineWidth = line.width;
            this.ctx.stroke();

            // Animate!
            if (line.lightPos) {
                line.light += 1;
                if (line.light > 90) {
                    line.lightPos = false;
                }
            } else {
                line.light -= 1;
                if (line.light <= 30) {
                    line.lightPos = true;
                }
            }
        });

        this.colorRound++;
        if (this.colorRound > this.colorSpeed && this.colorChangeCounter <= 0) {
            this.currentColor++;
            this.colorRound = 0;
            if (this.currentColor > this.colors.length - 1) {
                this.currentColor = 0;
            }
        }
    }
}
