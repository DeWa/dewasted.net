import Plasma from './effects/plasma';
import SinWave from './effects/sinwavetext';

const plasmaCanvas = document.getElementById('plasma-canvas');
const sinwaveCanvas = document.getElementById('sinwave-canvas');

const PlasmaEffect = new Plasma(plasmaCanvas, window.innerWidth / 6, 300 / 4);
const SinWaveEffect = new SinWave(
    sinwaveCanvas,
    window.innerWidth / 4,
    400 / 4
);

function animate(timestamp) {
    PlasmaEffect.draw(timestamp);
    SinWaveEffect.draw(timestamp);
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
