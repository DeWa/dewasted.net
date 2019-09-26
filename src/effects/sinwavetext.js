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
        this.amplitude = 20;
        this.degree = 45;
        this.paused = false;
        this.textY = 43;
        this.shadow = {
            x: 2,
            y: 2,
        };

        this.isSmall = window.innerWidth < 1400;
        this.textSize = this.isSmall ? '15px' : '25px';
        this.lastDrawn = 0;
        this.text = this.initText(this.originalText);
    }

    initText(text) {
        const textArr = text.split('');
        let position = 0;
        return textArr.map(char => {
            let width = this.ctx.measureText(char).width;
            if (this.isSmall) {
                width -= 10;
            }
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

        this.lastDrawn = timestamp;
        // Redraw
        this.text.forEach(char => {
            char.position += this.speed;
            if (char.position > this.width - char.width) {
                char.position = -char.width;
            }
            const y = Math.sin(char.position / this.degree) * this.amplitude;

            const grd = this.ctx.createLinearGradient(
                char.position,
                y + this.textY - 20,
                char.position,
                y + this.textY + 20
            );
            grd.addColorStop(0.28, 'rgb(255,242,181)');
            grd.addColorStop(0.4, 'rgb(77,77,77)');
            grd.addColorStop(0.54, 'rgb(255,242,181)');
            this.ctx.font = `${this.textSize} Black Ops One`;
            // Shadow
            this.ctx.fillStyle = '#121414';
            this.ctx.fillText(
                char.char,
                char.position + this.shadow.x,
                y + this.textY + this.shadow.y
            );
            // normal text
            this.ctx.fillStyle = grd;
            this.ctx.fillText(char.char, char.position, y + this.textY);
        });
    }
}
