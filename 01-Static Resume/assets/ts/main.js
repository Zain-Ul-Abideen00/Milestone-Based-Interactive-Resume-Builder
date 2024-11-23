/*==================== SHOW MENU ====================*/
var showMenu = function (toggleId, navId) {
    var toggle = document.getElementById(toggleId);
    var nav = document.getElementById(navId);
    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle("show-menu");
        });
    }
};
showMenu("nav-toggle", "nav-menu");
/*==================== REMOVE MENU MOBILE ====================*/
var navLink = document.querySelectorAll(".nav__link");
function linkAction() {
    var navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        // When we click on each nav__link, we remove the show-menu class
        navMenu.classList.remove("show-menu");
    }
}
navLink.forEach(function (n) { return n.addEventListener("click", linkAction); });
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
var sections = document.querySelectorAll("section[id]");
function scrollActive() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (current) {
        var sectionHeight = current.offsetHeight;
        var sectionTop = current.offsetTop - 50;
        var sectionId = current.getAttribute("id");
        if (sectionId &&
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight) {
            var link = document.querySelector(".nav__menu a[href*=\"".concat(sectionId, "\"]"));
            link === null || link === void 0 ? void 0 : link.classList.add("active-link");
        }
        else {
            var link = document.querySelector(".nav__menu a[href*=\"".concat(sectionId, "\"]"));
            link === null || link === void 0 ? void 0 : link.classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);
/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    var scrollTop = document.getElementById("scroll-top");
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200)
        scrollTop === null || scrollTop === void 0 ? void 0 : scrollTop.classList.add("show-scroll");
    else
        scrollTop === null || scrollTop === void 0 ? void 0 : scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);
/*==================== DARK LIGHT THEME ====================*/
var themeButton = document.getElementById("theme-button");
var darkTheme = "dark-theme";
var iconTheme = "bx-sun";
// Previously selected topic (if user selected)
var selectedTheme = localStorage.getItem("selected-theme");
var selectedIcon = localStorage.getItem("selected-icon");
// We obtain the current theme that the interface has by validating the dark-theme class
var getCurrentTheme = function () {
    return document.body.classList.contains(darkTheme) ? "dark" : "light";
};
var getCurrentIcon = function () {
    return (themeButton === null || themeButton === void 0 ? void 0 : themeButton.classList.contains(iconTheme)) ? "bx-moon" : "bx-sun";
};
// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton === null || themeButton === void 0 ? void 0 : themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](iconTheme);
}
// Activate / deactivate the theme manually with the button
themeButton === null || themeButton === void 0 ? void 0 : themeButton.addEventListener("click", function () {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});
/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCV() {
    document.body.classList.add("scale-cv");
}
/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale() {
    document.body.classList.remove("scale-cv");
}
// PDF generated area
var areaCv = document.getElementById("area-cv");
var resumeButton = document.getElementById("resume-button");
// Html2pdf options
var opt = {
    margin: 0,
    filename: "zainResume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: "px", format: [794, 1123] },
};
// Function to call `areaCv` and Html2Pdf options
function generateResume() {
    if (areaCv) {
        html2pdf(areaCv, opt);
    }
}
// When the button is clicked, it executes the three functions
resumeButton === null || resumeButton === void 0 ? void 0 : resumeButton.addEventListener("click", function () {
    // 1. Add the `.scale-cv` class to the body to reduce the size of the elements
    scaleCV();
    // 2. Generate the PDF
    generateResume();
    // 3. Remove the `.scale-cv` class after 5 seconds
    setTimeout(removeScale, 5000);
});
