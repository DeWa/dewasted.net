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
        this.amplitude = this.isSmall ? 8 : 25;
        this.degree = 45;
        this.paused = false;
        this.textY = 83;
        this.shadow = {
            x: 2,
            y: 2,
        };

        this.isSmall = window.innerWidth < 1400;
        this.textSize = this.isSmall ? '50px' : '50px';
        this.spacing = this.isSmall ? 50 : 30;
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
            position += width + this.spacing;
            return charObj;
        });
    }

    update() {
        // Redraw
        this.text.forEach(char => {
            char.position += this.speed;
            if (char.position > this.width - char.width + 50) {
                char.position = -char.width - 50;
            }
            const y = Math.sin(char.position / this.degree) * this.amplitude;

            const grd = this.ctx.createLinearGradient(
                char.position,
                y + this.textY - 20,
                char.position,
                y + this.textY + 20
            );
            grd.addColorStop(0.28, 'rgba(219, 219, 219, 1)');
            grd.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
            grd.addColorStop(0.54, 'rgba(93, 93, 93, 1)');
            this.ctx.font = `${this.textSize} skirmisherregular`;
            // Shadow
            this.ctx.fillStyle = 'rgba(66, 66, 66, 1)';
            this.ctx.fillText(
                char.char,
                char.position + this.shadow.x,
                y + this.textY + this.shadow.y
            );
            // normal text
            this.ctx.fillStyle = grd;
            this.ctx.fillText(char.char, char.position, y + this.textY);
            this.ctx.fillStyle = 'black';
            this.ctx.closePath();
        });
    }
}
