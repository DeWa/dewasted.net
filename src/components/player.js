import { Howl, Howler } from 'howler';

import blindedMp3 from '../public/assets/music/blinded.mp3';
import blindedOgg from '../public/assets/music/blinded.ogg';

const playerText = document.getElementById('playing-text');

const startText = 'PRESS TO PLAY';
const loadingText = 'LOADING...';
const playingText = 'Magma & wabe - Blinded Monarch';
const errorText = 'ERROR WHEN LOADING MUSIC';

const handleMusicClick = () => {
    if (music.state() === 'unloaded') {
        playerText.innerHTML = loadingText;
        music.load();
    } else if (music.playing()) {
        playerText.innerHTML = startText;
        music.pause();
    } else if (!music.playing()) {
        playerText.innerHTML = playingText;
        music.play();
    }
};

const addPlayingClass = () => {
    playerText.classList.remove('press-play');
    playerText.classList.add('playing');
};

const addPressPlayClass = () => {
    playerText.classList.remove('playing');
    playerText.classList.add('press-play');
};

const music = new Howl({
    src: [blindedMp3, blindedOgg],
    loop: true,
    preload: false,
    onplay: () => {
        addPlayingClass();
    },
    onpause: () => {
        addPressPlayClass();
    },
    onload: () => {
        playerText.innerHTML = playingText;
        music.play();
    },
    onloaderror: () => {
        playerText.innerHTML = errorText;
    },
    onplayerror: () => {
        playerText.innerHTML = errorText;
    },
});

const start = () => {
    music.play();
};

const stop = () => {
    music.stop();
};

const nowPlayingElement = document.getElementById('now-playing');
nowPlayingElement.addEventListener('click', handleMusicClick);

export default { start, stop };
