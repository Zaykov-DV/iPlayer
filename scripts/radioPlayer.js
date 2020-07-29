export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
 //   const radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play')
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };


    const selectItem = elem => {
        //перебор классов, удаление класса у всех итемов
        radioItem.forEach(item => item.classList.remove('select'));
        // добавление класса 1 элементу который выбран
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        // берем из родителя класс
        const parrent = target.closest('.radio-item');
        selectItem(parrent);
        // изменение названия радио
        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        //изменение картинки на обложку радио
        const img = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = img;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay()
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay()
    });

    // radioVolume.addEventListener('input', () => {
    //     radio.volume = radioVolume.value / 100;
    //
    // })

};