import { getRandom } from '../utils/utils';

/*
 * Stars Effect
 *
 * (c) Joonas Reinikka 2021
 */

class Star {
    constructor(ctx, x, y, layer, width) {
        this.ctx = ctx;
        this.x = x;
        this.originalX = x;
        this.y = y;
        this.originalY = y;
        this.layer = layer;
        this.speed = 3 - layer;
        this.width = width;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.x,
            this.y,
            0.8 - (this.layer / 8) * 2,
            0,
            2 * Math.PI
        );
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = 'black';
    }

    update() {
        this.x += this.speed;
        if (this.x > this.width) {
            this.x = 0;
            // Little position change after respawn
            this.x = 0 + getRandom(-8, 8);
            this.y = this.originalY + getRandom(-8, 8);
        }
    }
}

export default class StarEffect {
    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = 200;
        this.startY = 0;
        this.endY = Math.ceil(height / 3);
        this.parallaxLayers = 3;
        this.starAmount = 200;

        // Private
        this._stars = [];

        this.init();
    }

    init() {
        for (let i = 0; i < this.parallaxLayers; i++) {
            this._stars.push([]);
            for (let j = 0; j < this.starAmount; j++) {
                const star = new Star(
                    this.ctx,
                    getRandom(0, this.width),
                    getRandom(0, this.endY),
                    i,
                    this.width
                );
                this._stars[i].push(star);
            }
        }
    }

    update() {
        for (let i = 0; i < this.parallaxLayers; i++) {
            for (let j = 0; j < this._stars[i].length; j++) {
                const star = this._stars[i][j];
                star.draw();
                star.update();
            }
        }
    }
}
