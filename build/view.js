/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
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
  slides[slideIndex - 1].style.display = "block";
  navigationDots[slideIndex - 1].className += " active";
}
window.onload = function () {
  setInterval(function () {
    plusSlides(1);
  }, 3000);
};
/******/ })()
;
//# sourceMappingURL=view.js.map