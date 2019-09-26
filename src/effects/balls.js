/*
 * Balls
 *
 * (c) Joonas Reinikka 2019
 */

export default class Balls {
    constructor(canvasElement, canvasElement2, width, height) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.ctx2 = canvasElement2.getContext('2d');
        this.width = width;
        this.height = height;

        canvasElement.width = width;
        canvasElement.height = height;

        canvasElement2.width = width;
        canvasElement2.height = height;

        this.speed = 0.04;
        this.lapLength = 3;
        this.fps = 10;
        this.circleX = 80;
        this.circleY = 50;
        this.circleRadius = 40;
        this.ballsAmount = 5;
        this.waveDistance = -20;

        this.ballMax = 10;
        this.ballDistance = 1;
        this.ballMin = this.ballMax - this.ballsAmount * this.ballDistance;

        this.lastDrawn = 0;
        // this.ballsHoriz = [];
        // this.ballsVerti = [];
        this.ballsCorner = [];
        this.ballsCorner2 = [];

        this.initBalls();
    }

    initBalls() {
        const angleChange = (Math.PI * 2) / this.ballsAmount;
        let angleAddon = 0;

        // for (let i = 0; i < this.ballsAmount; i++) {
        //     this.ballsHoriz.push({
        //         x: 100,
        //         y: 30,
        //         angle: (angleAddon + Math.PI / 360) % (Math.PI * 2),
        //     });
        //     angleAddon += angleChange;
        // }

        // angleAddon = 0;

        // for (let i = 0; i < this.ballsAmount; i++) {
        //     this.ballsVerti.push({
        //         x: 80,
        //         y: 30,
        //         angle: (angleAddon + Math.PI / 360) % (Math.PI * 2),
        //     });
        //     angleAddon += angleChange;
        // }

        angleAddon = 0;

        for (let i = 0; i < this.ballsAmount; i++) {
            this.ballsCorner.push({
                x: 80,
                y: 30,
                angle: (angleAddon + Math.PI / 360) % (Math.PI * 2),
            });
            angleAddon += angleChange;
        }

        angleAddon = 0;

        for (let i = 0; i < this.ballsAmount; i++) {
            this.ballsCorner2.push({
                x: 80,
                y: 30,
                angle: (angleAddon + Math.PI / 360) % (Math.PI * 2),
            });
            angleAddon += angleChange;
        }
    }

    drawBall(ball) {
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
        const grd = this.ctx.createRadialGradient(
            ball.x,
            ball.y,
            0,
            ball.x,
            ball.y,
            ball.radius + 5
        );
        150.0, 150.0, 0.0, 150.0, 150.0, 150.0;
        // Add colors
        grd.addColorStop(0.0, 'rgba(129, 232, 246, 1.000)');
        grd.addColorStop(0.1, 'rgba(118, 222, 239, 1.000)');
        grd.addColorStop(0.8, 'rgba(5, 81, 148, 1.000)');
        grd.addColorStop(1.0, 'rgba(6, 39, 69, 1.000)');
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#003300';
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx2.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    calculateRadius(ball) {
        return ball;
    }

    draw(timestamp) {
        if (timestamp - this.lastDrawn < this.fps) {
            return;
        }
        this.lastDrawn = timestamp;

        this.clear();

        // this.ballsHoriz.map(ball => {
        //     const newAngle = (ball.angle + Math.PI / 360) % (Math.PI * 2);
        //     ball.x = this.circleX + this.circleRadius * Math.cos(newAngle);
        //     ball.angle += this.speed;
        //     if (ball.angle > Math.PI * 2) {
        //         ball.angle = 0;
        //     }
        //     ball.radius =
        //         (this.circleY + this.circleRadius * Math.sin(ball.angle) + 90) /
        //         15;
        // });

        // this.ballsVerti.map(ball => {
        //     const newAngle = (ball.angle + Math.PI / 360) % (Math.PI * 2);
        //     ball.y = this.circleY + this.circleRadius * Math.cos(newAngle);
        //     ball.angle += this.speed;
        //     if (ball.angle > Math.PI * 2) {
        //         ball.angle = 0;
        //     }
        //     ball.radius =
        //         (this.circleY + this.circleRadius * Math.sin(ball.angle) + 90) /
        //         15;
        // });

        this.ballsCorner.map(ball => {
            const newAngle = (ball.angle + Math.PI / 360) % (Math.PI * 2);
            const addon =
                this.circleY +
                this.circleRadius * Math.sin(newAngle) +
                this.waveDistance; // Last number is
            ball.y = this.circleY + this.circleRadius * Math.cos(newAngle);
            ball.x = this.circleX + this.circleRadius * Math.cos(newAngle);

            ball.angle += this.speed;
            if (ball.angle > Math.PI * 2) {
                ball.angle = 0;
            }
            ball.radius =
                (this.circleY + this.circleRadius * Math.sin(ball.angle) + 90) /
                15;
        });

        this.ballsCorner2.map(ball => {
            const newAngle = (ball.angle + Math.PI / 360) % (Math.PI * 2);
            ball.y = this.circleY - this.circleRadius * Math.cos(newAngle);
            ball.x = this.circleX + this.circleRadius * Math.cos(newAngle);

            ball.angle += this.speed;
            if (ball.angle > Math.PI * 2) {
                ball.angle = 0;
            }
            ball.radius =
                (this.circleY + this.circleRadius * Math.sin(ball.angle) + 90) /
                16;
        });

        let allBalls = [...this.ballsCorner, ...this.ballsCorner2];
        let sortedBalls = allBalls.sort((a, b) => a.radius - b.radius);
        sortedBalls.map(ball => this.drawBall(ball));
        this.ctx2.drawImage(this.canvas, 0, 0);
    }
}
