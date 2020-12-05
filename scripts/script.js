document.addEventListener("DOMContentLoaded", function() {

  // elems

  const screenBlock = document.querySelector(".screen"),
        screenWrapper = document.querySelector(".screen__wrapper"),
        menu = document.querySelector(".menu"),
        menuInner = menu.querySelector(".menu__inner"),
        burger = document.querySelector(".burger"),
        menuClose = document.querySelector(".menu__close"),
        serviceBlock = document.querySelector(".service"),
        serviceInnerLeft = serviceBlock.querySelector(".service-inner__left"),
        serviceInnerRight = serviceBlock.querySelector(".service-inner__right"),
        syncBlock = document.querySelector(".sync"),
        syncInner = document.querySelector(".sync .container"),
        sections = document.querySelectorAll("SECTION"),
        scrollBtnPrev = document.querySelector(".scroll-btn-prev"),
        scrollBtnNext = document.querySelector(".scroll-btn-next"),
        condsBlock = document.querySelector(".conds"),
        condsLeaves = condsBlock.querySelectorAll(".leaf");

  // data

  let menuWidth,
      syncTabIsInsert,
      serviceAnimIsStart,
      btnNextIsClicked = false,
      btnPrevIsClicked = false;

  // variable width of menu

  if (screen.width > 1400) {
    menuWidth = 450;
  } else if (screen.width > 991) {
    menuWidth = 350;
  } else if (screen.width > 520) {
    menuWidth = 300;
  } else {
    menuWidth = 250;
  }

  if (screen.width < 768) {
    screenWrapper.insertAdjacentHTML('beforeend', '<img class="screen__laptop" src="./img/desktop.png" alt="Компьютер">');
  } else {
    screenWrapper.insertAdjacentHTML('beforeend', '<img class="screen__laptop" src="./img/laptop.gif" alt="Ноутбук">');
  }

  menu.dataset.slided = 'false';

  function openMenu() {
    if (menu.dataset.slided == 'false') {
      menu.dataset.slided = 'true';
      menuInner.style.display = 'flex';
      menu.style.width = menuWidth + 'px';
    } else {
      menu.dataset.slided = 'false';
      menu.style.width = '0px';
      menuInner.style.display = 'none';
    }
  }

  function closeMenu() {
    if (menu.dataset.slided == 'true') {
      menu.dataset.slided = 'false';
      menu.style.width = '0px';
      menuInner.style.display = 'none';
    }
  }

  // функция, обрабатывающая проигрывание смены блоков в секции "service"

  let totalTimeServiceAnim = 16000;

  function initServicePlayback() {
    setTimeout(function() {
      serviceInnerLeft.innerHTML = `
      <div class="service-item__wrapper servcieItemFadeIn">
        <span class="service-item__num">1</span>
        <div class="service-item">Контроль новых заявок из внешних источников (Instagram, WhatsApp, доски объявлений)</div>
      </div>`;
      serviceInnerRight.innerHTML = `
      <div class="service-icon serviceImgBubble">
        <img class="service-icon__img" src="./img/Client-1.gif" alt="Работа с клиентами">
      </div>`;
    }, 0);

    setTimeout(function() {
      serviceInnerLeft.innerHTML = `
      <div class="service-item__wrapper servcieItemFadeIn">
        <span class="service-item__num">2</span>
        <div class="service-item">Распределение всех заказов по этапам воронки в CRM</div>
      </div>`;
      serviceInnerRight.innerHTML = `
      <div class="service-icon serviceImgBubble">
        <img class="service-icon__img" src="./img/Client-2.gif" alt="Работа с клиентами">
      </div>`;
    }, (totalTimeServiceAnim / 4));

    setTimeout(function() {
      serviceInnerLeft.innerHTML = `
      <div class="service-item__wrapper servcieItemFadeIn">
        <span class="service-item__num">3</span>
        <div class="service-item">Формирование запроса и отправка предложений в ручном и автоматическом режиме</div>
      </div>`;
      serviceInnerRight.innerHTML = `
      <div class="service-icon serviceImgBubble">
        <img class="service-icon__img" src="./img/Client-3.gif" alt="Работа с клиентами">
      </div>`;
    }, (totalTimeServiceAnim / 4) * 2);

    setTimeout(function() {
      serviceInnerLeft.innerHTML = `
      <div class="service-item__wrapper servcieItemFadeIn">
        <span class="service-item__num">4</span>
        <div class="service-item">Хранение историй сделок, базы данных клиентов, формирование отчетов за период, в том чилсе финансовых</div>
      </div>`;
      serviceInnerRight.innerHTML = `
      <div class="service-icon serviceImgBubble">
        <img class="service-icon__img" src="./img/Client-4.gif" alt="Работа с клиентами">
      </div>`;
    }, (totalTimeServiceAnim / 4) * 3);
  }




  // появление планета и проигрывания анимаций по скроллу

  window.addEventListener("scroll", function() {
    syncTabIsInsert = syncBlock.dataset.gifInsert == 'false' ? true : false;
    serviceAnimIsStart = serviceBlock.dataset.playbackStart == 'false' ? true : false;

    // повяление гифок и анимация

    if (screen.width > 768 && syncBlock.getBoundingClientRect().top < 550 && syncTabIsInsert) {
      syncInner.insertAdjacentHTML("beforeend", '<img class="sync__tablet sync__tablet_gif tabFadeIn" src="./img/tab.gif" alt="Планшет">');
      syncBlock.dataset.gifInsert = 'true';
    }

    if (serviceInnerLeft.getBoundingClientRect().top < 600 && serviceAnimIsStart) {
      initServicePlayback();
      setInterval(initServicePlayback, totalTimeServiceAnim);
      serviceBlock.dataset.playbackStart = 'true';
    }

  });


  // таймер

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
   
  function initializeClock(id, endtime) {
    let clock = document.querySelector("#count"),
        daysSpan = clock.querySelector('#days'),
        hoursSpan = clock.querySelector('#hours'),
        minutesSpan = clock.querySelector('#minutes'),
        secondsSpan = clock.querySelector('#seconds');
   
    function updateClock() {
      let t = getTimeRemaining(endtime);
   
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
   
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
   
    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }
   
  let deadline = new Date(Date.parse(new Date()) + 1 * 6 * 54 * 60 * 1000); 
  initializeClock('countdown', deadline);

  // параллакс

  if(screen.width > 1200) {
    let parralaxCoordX, parralaxCoordY, blurValue;
    condsBlock.addEventListener("mousemove", function(e) {
      parralaxCoordX = (e.clientX) / 80;
      parralaxCoordY = (e.clientY) / 80;
      blurValue = (e.clientX - e.clientY) / 100;
      condsLeaves.forEach(function(elem, i) {
        if (elem.dataset.leafType == 'clear') {
          elem.style.filter = "blur(" +  (blurValue.toFixed()) + "px)";
        }
        if (elem.dataset.leafType == 'blur') {
          elem.style.filter = "blur(" +  (10 - blurValue.toFixed()) + "px)";
        }
      });
      if (screen.width > 1400) {
        condsBlock.style.backgroundPositionX = parralaxCoordX.toFixed() + 'px';
        condsBlock.style.backgroundPositionY = parralaxCoordY.toFixed() + 'px';
      }
      if (screen.width > 1200 && screen.width < 1400) {
        parralaxCoordX -= 130;
        condsBlock.style.backgroundPositionX = parralaxCoordX.toFixed() + 'px';
        condsBlock.style.backgroundPositionY = parralaxCoordY.toFixed() + 'px';
      }
      if (screen.width > 991 && screen.width < 1200) {
        parralaxCoordX -= 220;
        condsBlock.style.backgroundPositionX = parralaxCoordX.toFixed() + 'px';
        condsBlock.style.backgroundPositionY = parralaxCoordY.toFixed() + 'px';
      }
    });
  }

  // события для меню

  burger.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  screenBlock.addEventListener("click", closeMenu);

});