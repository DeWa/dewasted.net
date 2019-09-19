/*
 * Balls
 *
 * (c) Joonas Reinikka 2019
 */

export default class Balls {
    constructor(canvasElement, width, height) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.width = width;
        this.height = height;

        canvasElement.width = width;
        canvasElement.height = height;

        this.speed = 2;
        this.fps = 10;
    }

    draw(timestamp) {}
}
