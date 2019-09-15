/*
 * SinWaveText
 *
 * (c) Joonas Reinikka 2019
 */

export default class SinWaveText {
    constructor(canvasElement, width, height) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.width = width;
        this.height = height;

        canvasElement.width = width;
        canvasElement.height = height;

        this.speed = 2;
        this.fps = 10;
        this.originalText = 'DEWASTED.NET';
        this.amplitude = 30;
        this.degree = 45;
        this.paused = false;
        this.textY = 60;
        this.shadow = {
            x: 2,
            y: 2,
        };

        this.lastDrawn = 0;
        this.text = this.initText(this.originalText);
    }

    initText(text) {
        const textArr = text.split('');
        let position = 0;
        return textArr.map(char => {
            const width = this.ctx.measureText(char).width;
            const charObj = {
                char,
                width,
                position,
            };
            position += width + 20;
            return charObj;
        });
    }
    getTime() {
        return this.paused ? this.pausedTime : Date.now() - this.startTime;
    }

    draw(timestamp) {
        if (timestamp - this.lastDrawn < this.fps) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.lastDrawn = timestamp;
        // Redraw
        this.text.forEach(char => {
            char.position += this.speed;
            if (char.position > this.width - char.width) {
                char.position = -char.width;
            }
            const y = Math.sin(char.position / this.degree) * this.amplitude;

            const gradient = this.ctx.createLinearGradient(0, 0, 300, 300);
            gradient.addColorStop(0, '#D3D3D3');
            gradient.addColorStop(1, '#2D3436');
            this.ctx.font = '25px Saira Stencil One';
            // Shadow
            this.ctx.fillStyle = '#121414';
            this.ctx.fillText(
                char.char,
                char.position + this.shadow.x,
                y + this.textY + this.shadow.y
            );
            // normal text
            this.ctx.fillStyle = gradient;
            this.ctx.fillText(char.char, char.position, y + this.textY);
        });
    }
}
