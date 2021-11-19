import Plasma from './effects/plasma';
import Lines from './effects/gradientlines';
import Stars from './effects/stars';
import Sinwave from './effects/sinwavetext';

import { initPlayer } from './components/player';

let fpsInterval, startTime, now, then, elapsed;

const effectCanvas = document.getElementById('effects');
const ctx = effectCanvas.getContext('2d');

// Effects
const plasmaEffect = new Plasma(ctx, effectCanvas.width, effectCanvas.height);
const linesEffect = new Lines(
    effectCanvas,
    effectCanvas.width,
    effectCanvas.height
);
const starsEffect = new Stars(ctx, effectCanvas.width, effectCanvas.height);
const sinwaveText = new Sinwave(
    effectCanvas,
    effectCanvas.width,
    effectCanvas.height
);

function clearCanvas() {
    const ctx = effectCanvas.getContext('2d');
    ctx.clearRect(0, 0, effectCanvas.width, effectCanvas.height);
}

const start = () => {
    fpsInterval = 1000 / 30; // 30FPS
    then = Date.now();
    startTime = then;
    animate();
};

initPlayer();

// 30 fps
function animate() {
    window.requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        // Update effects
        clearCanvas();
        plasmaEffect.update();
        starsEffect.update();
        linesEffect.update();
        sinwaveText.update();
        then = now - (elapsed % fpsInterval);
    }
}

start();
