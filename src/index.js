import Plasma from './effects/plasma';
import SinWave from './effects/sinwavetext';
import GradientLines from './effects/gradientlines';
import Balls from './effects/balls';

const plasmaCanvas = document.getElementById('plasma-canvas');
const sinwaveCanvas = document.getElementById('sinwave-canvas');
const ballsCanvas = document.getElementById('balls-canvas');

const PlasmaEffect = new Plasma(plasmaCanvas, window.innerWidth / 6, 300 / 4);
const SinWaveEffect = new SinWave(
    sinwaveCanvas,
    window.innerWidth / 4,
    400 / 4
);
const GradientLinesEffect = new GradientLines(
    sinwaveCanvas,
    window.innerWidth / 4,
    400 / 4
);
const BallsEffect = new Balls(ballsCanvas, 300, 300);

function clearCanvas(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function animate(timestamp) {
    PlasmaEffect.draw(timestamp);

    clearCanvas(sinwaveCanvas);
    GradientLinesEffect.draw(timestamp);
    SinWaveEffect.draw(timestamp);
    BallsEffect.draw(timestamp);

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
