import  {addZero} from "./subscript.js";

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonStop = document.querySelector('.audio-button__stop');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume = document.querySelector('.audio-volume');
    const audioVolumeMute = document.querySelector('.audio-button__mute');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`
        audioHeader.textContent = track.toUpperCase()
        audioPlayer.src = `./audio/${track}.mp3`

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex +=1;
        }
        loadTrack()
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex -=1;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack()
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase()

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

        }
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
        });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        let minutesPassed = Math.floor(currentTime / 60 ) || '0';
        let secondsPassed = Math.floor( currentTime % 60 ) || '0';

        let minutesTotal = Math.floor(duration / 60 ) || '0';
        let secondsTotal = Math.floor( duration % 60 ) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX; //координата куда кликнули
        const allWidth = audioProgress.clientWidth; // получаем конкретный размер на странице
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress
    });

    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
    });

    audioVolumeMute.addEventListener('click', () => {
        if (audioPlayer.volume !== 0) {
            audioPlayer.volume = 0;
        } else {
            audioPlayer.volume = audioVolume.value / 100;
        }
    });


    //как добавить смену иконок, сброс до 1-го трека
    audioButtonStop.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    })

};