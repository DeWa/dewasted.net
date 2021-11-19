import { Howl } from 'howler';

const blindedMp3Url = new URL(
    '../public/assets/music/blinded.mp3',
    import.meta.url
);
const blindedOggUrl = new URL(
    '../public/assets/music/blinded.ogg',
    import.meta.url
);

const playerText = document.getElementById('playing-text');

const startText = 'PRESS TO PLAY';
const loadingText = 'LOADING...';
const playingText = 'NOW PLAYING: MAGMA & WABE - BLINDED MONARCH';
const errorText = 'ERROR WHEN LOADING MUSIC';

export const initPlayer = () => {
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
        src: [blindedMp3Url.href, blindedOggUrl.href],
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

    const nowPlayingElement = document.getElementById('now-playing');
    nowPlayingElement.addEventListener('click', handleMusicClick);
};
