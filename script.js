document.addEventListener('DOMContentLoaded', () => {

  function debounce(fn, t = 250) {
    let id;
    return (...a) => {
      clearTimeout(id);
      id = setTimeout(() => fn(...a), t);
    };
  }

  const photosSwiper = new Swiper(".my-photos-swiper", {
    effect: "slide",
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".my-photos-swiper .swiper-pagination",
      clickable: true
    },
    on: {
      slideChange: function () {
        this.el.classList.remove("theme-1", "theme-2");
        const index = (this.realIndex % 2) + 1;
        this.el.classList.add(`theme-${index}`);
      }
    }
  });

  const swiperContainer = document.querySelector(".mySwiper");
  if (swiperContainer) {

    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

    if (swiperWrapper && !swiperWrapper.dataset.manualCloned) {
      const originalSlides = Array.from(swiperWrapper.querySelectorAll(':scope > .swiper-slide'));

      originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('manual-clone');
        swiperWrapper.appendChild(clone);
      });

      swiperWrapper.dataset.manualCloned = "1";
    }

    const stretchRatio = 0.045;
    const initialStretchValue = -(swiperContainer.offsetWidth * stretchRatio);

    const coverflowSwiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: initialStretchValue,
        depth: 100,
        modifier: 4.5,
        slideShadows: false,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
    });

    function updateSwiperStretch() {
      coverflowSwiper.params.coverflowEffect.stretch = -(swiperContainer.offsetWidth * stretchRatio);
      coverflowSwiper.update();
    }
    window.addEventListener("resize", debounce(updateSwiperStretch, 150));
  }

  const menuTrigger = document.querySelector(".menu-stick");
  const body = document.body;
  const html = document.documentElement;

  if (menuTrigger) {
    menuTrigger.addEventListener("click", () => {
      body.classList.toggle("menu-is-open");
      html.classList.toggle("menu-is-open");
    });
  }

});