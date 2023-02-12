'use strict';

/**
 * navbar variables
 */
const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});
if (window.location.pathname == '/') {
  for (let i = 0; i < 2; i++) {
    var scr1 = document.createElement("script");
    scr1.innerHTML = `
    var scr = document.createElement("script");
    var atOptions = {
      'key' : '6fff892345d117aa57f09581762eb579',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
      }
      scr.src =
      "http" +
      (location.protocol === "https:" ? "s" : "") +
      "://www.profitabledisplayformat.com/6fff892345d117aa57f09581762eb579/invoke.js";
      document.querySelector("#Trending .container .movies-list").appendChild(scr);
    `;
    document.querySelector("#top").appendChild(scr1);
  }
}

/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});