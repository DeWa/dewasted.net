/*
 * Plasma Effect
 *
 * Modified from (https://rosettacode.org/wiki/Plasma_effect#JavaScript)
 */

export default class PlasmaEffect {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.startY = Math.ceil(height / 3);
        this.height = height;

        this.lastDrawn = 0;
        this.speed = 1;
        this.hueShift = 0;
        this.switch = 0;
        this.size = 0.2;

        this.isSmall = window.innerWidth < 1400;
        this.plasma = this.createPlasma();
        this.context.fillRect(0, 0, this.width, this.height);
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
        const { width, height, plasma, context, startY } = this;
        const img = this.context.getImageData(
            0,
            0,
            Math.ceil(width),
            Math.ceil(height)
        );

        for (let y = startY; y < height; y++) {
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
        const { width, height, startY } = this;
        var buffer = new Array(Math.ceil(height));

        for (var y = startY; y < height; y++) {
            buffer[y] = new Array(Math.ceil(width));

            for (var x = 0; x < width; x++) {
                var value = Math.sin(x / 40.0);
                value += Math.sin(y / 16.0);
                value += Math.sin((x + y) / 42.0);
                value += Math.sin(Math.sqrt(x * x + y * y) / 30.0);
                value += 4; // shift range from -4 .. 4 to 0 .. 8
                value /= 8; // bring range down to 0 .. 1

                buffer[y][x] = value;
            }
        }
        return buffer;
    }

    update() {
        this.hueShift = (this.hueShift + 0.02) % 1;
        this.plasma = this.createPlasma();
        this.context.fillRect(0, 0, this.width * 2, this.height * 2);
        this.drawPlasma(this.width * 2, this.height * 2);
    }
}
