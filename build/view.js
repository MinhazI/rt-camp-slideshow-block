/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
var slideIndex = 1;
showSlides(slideIndex);
function navigateSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var navigationDots = document.getElementsByClassName("navigation");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < navigationDots.length; i++) {
    navigationDots[i].className = navigationDots[i].className.replace(" active", "");
  }
  navigateSlides ? slides[slideIndex - 1].style.display = "block" : "";
  navigationDots.length ? navigationDots[slideIndex - 1].className += " active" : "";
}
window.onload = function () {
  var navigationDots = document.getElementsByClassName("navigation");
  navigationDots.length ? setInterval(function () {
    navigateSlides(1);
  }, 5000) : "";
};
document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior
      navigateSlides(-1);
    });
    nextButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior
      navigateSlides(1);
    });
  }
  const navigationItems = document.querySelectorAll(".navigation-container .navigation");
  if (navigationItems) {
    navigationItems.forEach(function (item, index) {
      item.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        currentSlide(index + 1); // Adjust index to start from 1
      });
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      navigateSlides(-1);
    } else if (event.key === "ArrowRight") {
      navigateSlides(1);
    }
  });
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });
  document.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      navigateSlides(1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      navigateSlides(-1);
    }
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map