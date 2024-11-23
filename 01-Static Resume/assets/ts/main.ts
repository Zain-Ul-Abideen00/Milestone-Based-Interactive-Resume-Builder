/*==================== SHOW MENU ====================*/

const showMenu = (toggleId: string, navId: string): void => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll<HTMLAnchorElement>(".nav__link");

function linkAction(): void {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) {
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
  }
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll<HTMLElement>("section[id]");

function scrollActive(): void {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (
      sectionId &&
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      const link = document.querySelector<HTMLAnchorElement>(
        `.nav__menu a[href*="${sectionId}"]`
      );
      link?.classList.add("active-link");
    } else {
      const link = document.querySelector<HTMLAnchorElement>(
        `.nav__menu a[href*="${sectionId}"]`
      );
      link?.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== SHOW SCROLL TOP ====================*/

function scrollTop(): void {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollTop?.classList.add("show-scroll");
  else scrollTop?.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = (): string =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = (): string =>
  themeButton?.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton?.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton?.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCV(): void {
  document.body.classList.add("scale-cv");
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScale(): void {
  document.body.classList.remove("scale-cv");
}

/*==================== GENERATE PDF ====================*/
// Import the `html2pdf` library
declare function html2pdf(element: HTMLElement, options?: any): void;

// PDF generated area
const areaCv = document.getElementById("area-cv") as HTMLElement | null;
const resumeButton = document.getElementById("resume-button");

// Html2pdf options
const opt = {
  margin: 0,
  filename: "zainResume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { unit: "px", format: [794, 1123] },
};


// Function to call `areaCv` and Html2Pdf options
function generateResume(): void {
  if (areaCv) {
    html2pdf(areaCv, opt);
  }
}

// When the button is clicked, it executes the three functions
resumeButton?.addEventListener("click", () => {
  // 1. Add the `.scale-cv` class to the body to reduce the size of the elements
  scaleCV();

  // 2. Generate the PDF
  generateResume();

  // 3. Remove the `.scale-cv` class after 5 seconds
  setTimeout(removeScale, 5000);
});