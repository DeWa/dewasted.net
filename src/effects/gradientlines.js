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

        this.speed = 2;
        this.fps = 10;
        this.lineSize = 6;
        this.colors = [244, 350, 129, 0, 64];
        this.subLineSize = 2;
        this.startY = 23;
        this.colorSpeed = 100;
        this.colorChangeSpeed = 0.08;
        this.colorChangeDelay = 0.5;

        this.lastDrawn = 0;
        this.lines = [];
        this.colorRound = 0;
        this.currentColor = 0;
        this.newColor = this.colors[this.currentColor];
        this.colorChangeCounter = 0;
        this.isColorChangeOn = false;

        this.initLines();
    }

    initLines() {
        // Lines are actually 5 small lines per line
        let linePos = this.startY;
        let light = 30;
        for (let i = 0; i < this.lineSize; i++) {
            this.lines.push([]);
            for (let j = 0; j < 5; j++) {
                this.lines[i].push({
                    width: this.subLineSize,
                    y: linePos,
                    color: this.colors[this.currentColor],
                    light: light,
                    lightPos: true,
                    colorChangeOn: false,
                });
                linePos += this.subLineSize;
                light += 90 / 5;
            }
            light = 30;
        }
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

    draw(timestamp) {
        if (timestamp - this.lastDrawn < this.fps) {
            return;
        }
        this.lastDrawn = timestamp;
        // Lines
        if (this.colorChangeCounter > 0) {
            this.colorChangeCounter--;
        }
        this.lines.map((mainLine, mainIndex) => {
            mainLine.map((line, index) => {
                if (line.color !== this.colors[this.currentColor]) {
                    if (
                        this.colorChangeCounter <
                        (mainIndex + +0.1) * 10.3 +
                            (index + 0.1) * 9 * this.colorChangeDelay
                    ) {
                        if (line.color < this.colors[this.currentColor]) {
                            line.color += this.colorChangeSpeed;
                        } else {
                            line.color -= this.colorChangeSpeed;
                        }
                    }
                }
                // Change colorChange flag
                if (
                    mainIndex === 0 &&
                    index === 0 &&
                    Math.round(line.color) === this.colors[this.currentColor] &&
                    this.isColorChangeOn
                ) {
                    console.log('Oihiohj');
                    this.isColorChangeOn = false;
                }
                this.ctx.beginPath();
                this.ctx.moveTo(0, line.y);
                this.ctx.lineTo(this.canvas.width, line.y);

                const color = this.HSVtoRGB(
                    line.color / 360,
                    90,
                    line.light / 100
                );
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
        });
        this.colorRound++;
        if (
            this.colorRound > this.colorSpeed &&
            this.colorChangeCounter <= 0 &&
            !this.isColorChangeOn
        ) {
            this.isColorChangeOn = true;
            this.currentColor++;
            this.colorRound = 0;
            if (this.currentColor > this.colors.length - 1) {
                this.currentColor = 0;
            }
            this.colorChangeCounter =
                this.lineSize * this.colorChangeDelay * 50;
        }
    }
}
