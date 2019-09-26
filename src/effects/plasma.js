/*
 * Plasma Effect
 *
 * Modified from (https://rosettacode.org/wiki/Plasma_effect#JavaScript)
 */

export default class PlasmaEffect {
    constructor(canvasElement, width, height) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;

        this.lastDrawn = 0;
        this.speed = 1;
        this.fps = 20;
        this.hueShift = 0;
        this.switch = 0;
        this.size = 0.2;

        this.isSmall = window.innerWidth < 1400;
        this.plasma = this.createPlasma();
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

    drawPlasma() {
        const { width, height, plasma, context } = this;
        const img = this.context.getImageData(
            0,
            0,
            Math.ceil(width),
            Math.ceil(height)
        );
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.switch = this.switch + 0.1;

                var hue = this.hueShift + (plasma[y][x] % 1) / this.size;
                var rgb = this.HSVtoRGB(hue, 1, 1);
                var pos = (y * Math.ceil(width) + x) * 4;
                img.data[pos] = rgb.r / 19;
                img.data[pos + 1] = rgb.g / 9;
                img.data[pos + 2] = rgb.b / 1;
            }
        }
        context.putImageData(img, 0, 0);
    }

    createPlasma() {
        const { width, height } = this;
        var buffer = new Array(Math.ceil(height));

        for (var y = 0; y < height; y++) {
            buffer[y] = new Array(Math.ceil(width));

            for (var x = 0; x < width; x++) {
                var value = Math.sin(x / 11.0);
                value += Math.sin(y / 16.0);
                value += Math.sin((x + y) / 22.0);
                value += Math.sin(Math.sqrt(x * x + y * y) / 8.0);
                value += 4; // shift range from -4 .. 4 to 0 .. 8
                value /= 8; // bring range down to 0 .. 1

                buffer[y][x] = value;
            }
        }
        return buffer;
    }

    draw(timestamp) {
        if (timestamp - this.lastDrawn >= this.fps) {
            this.lastDrawn = timestamp;
            this.hueShift = (this.hueShift + 0.02) % 1;
            this.drawPlasma(this.canvas.width, this.canvas.height);
        }
    }
}
