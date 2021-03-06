import {videoPlayerInit} from "./videoPlayer.js";
import {musicPlayerInit} from "./musicPlayer.js";
import {radioPlayerInit} from "./radioPlayer.js";



musicPlayerInit();
radioPlayerInit();


const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBlock.forEach((item) => item.classList.remove('active'));
    playerBtn.forEach((item) => item.classList.remove('active'));
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
      deactivationPlayer();
      btn.classList.add('active');
      playerBlock[i].classList.add('active');
    }));

videoPlayerInit();