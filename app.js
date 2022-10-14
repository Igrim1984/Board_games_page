// <----------------------- Intro -------------------------->

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1.5 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo("big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

// <----------------------- Slider -------------------------->

const THUMBNAILS  = document.querySelectorAll(".thumbnail, .gallery--name")
const THUMBNAILS_IMGS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");
const GALLERY_COLLAPSE = document.querySelector(".gallery--collapse");
const GALLERY_EXPAND = document.querySelector(".gallery--expand");
const GALLERY = document.querySelector(".gallery");


let currentImgIndex;

const showNextImg = () => {
  if (currentImgIndex === THUMBNAILS_IMGS.length - 1) {
    currentImgIndex = 0;
  } else {
    currentImgIndex++;
  }
  POPUP_IMG.src = THUMBNAILS_IMGS[currentImgIndex].src;
};

const showPreviousImg = () => {
  if (currentImgIndex === 0) {
    currentImgIndex = THUMBNAILS_IMGS.length - 1;
  } else {
    currentImgIndex--;
  }
  POPUP_IMG.src = THUMBNAILS_IMGS[currentImgIndex].src;
};

const closePopup = () => {
  POPUP.classList.add("fadeOut");
  setTimeout(() => {
    POPUP.classList.add("hidden");
    POPUP.classList.remove("fadeOut");
    THUMBNAILS_IMGS.forEach((element) => {
      element.setAttribute("tabindex", 1);
    });
  }, 500);
};

THUMBNAILS_IMGS.forEach((thumbnail, index) => {
  const showPopup = (e) => {
    POPUP.classList.remove("hidden");
    POPUP_IMG.src = e.target.src;
    currentImgIndex = index;
    THUMBNAILS_IMGS.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });
  };

  thumbnail.addEventListener("click", showPopup);

  thumbnail.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.keycode === 13) {
      showPopup(e);
    }
  });
});

POPUP_CLOSE.addEventListener("click", closePopup);

ARROW_RIGHT.addEventListener("click", showNextImg);

ARROW_LEFT.addEventListener("click", showPreviousImg);

document.addEventListener("keydown", (e) => {
  if (!POPUP.classList.contains("hidden")) {
    if (e.code === "ArrowRight" || e.keycode === 39) {
      showNextImg();
    }

    if (e.code === "ArrowLeft" || e.keycode === 37) {
      showPreviousImg();
    }

    if (e.code === "Escape" || e.keycode === 27) {
      closePopup();
    }
  }
});

POPUP.addEventListener("click", (e) => {
  if (e.target === POPUP) {
    closePopup();
  }
});

const collapse_gallery = () => {
  GALLERY_COLLAPSE.classList.add("gallery--hidden");
  GALLERY.classList.add("gallery--collapsed");
  THUMBNAILS.forEach((element) => {
    element.classList.add("gallery--hidden")
  })
  GALLERY_EXPAND.classList.remove("gallery--hidden")
  console.log(GALLERY_COLLAPSE, GALLERY_EXPAND, GALLERY)
}

const expand_gallery = () => {
  GALLERY_EXPAND.classList.add("gallery--hidden");
  GALLERY.classList.remove("gallery--collapsed");
  THUMBNAILS.forEach((element) => {
    element.classList.remove("gallery--hidden")
  })
  GALLERY_COLLAPSE.classList.remove("gallery--hidden")
};

GALLERY_COLLAPSE.addEventListener("click", collapse_gallery);
GALLERY_EXPAND.addEventListener("click", expand_gallery);