import  {addZero} from "./subscript.js";

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoProgress = document.querySelector('.video-progress');
    const videoFullScreen = document.querySelector('.video-fullscreen');
    const videoVolume = document.querySelector('.video-volume');

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    const togglePlay = () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
            toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }


    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        let minutesPassed = Math.floor(currentTime / 60 );
        let secondsPassed = Math.floor( currentTime % 60 );

        let minutesTotal = Math.floor(duration / 60 );
        let secondsTotal = Math.floor( duration % 60 );

        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

        videoProgress.value = (currentTime / duration) * 100

    });

        videoProgress.addEventListener('input', () => {
            const duration = videoPlayer.duration;
            const value = videoProgress.value;

            videoPlayer.currentTime = (value * duration) / 100;   //место на которое кликнули в сек.

        });

        videoFullScreen.addEventListener('click', () => {
            videoPlayer.requestFullscreen();
        });

        videoVolume.addEventListener('input', () => {
            videoPlayer.volume = videoVolume.value / 100;
    });

};



