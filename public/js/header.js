window.addEventListener("scroll", () => {
  let e = document.getElementById("header");
  window.scrollY > 50 ? (e.classList.remove("bg-white"), e.classList.add("backdrop-blur-xl", "bg-opacity-85")) : (e.classList.remove("backdrop-blur-xl", "bg-opacity-85"), e.classList.add("bg-white"))
});
const mobileMenuButton = document.getElementById("mobile-menu-button"),
  mobileMenuClose = document.getElementById("mobile-menu-close"),
  mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-y-full"), document.body.style.overflow = "hidden"
}), mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-y-full"), document.body.style.overflow = "auto"
});
const mobileToolsButton = document.getElementById("mobile-tools-button"),
  mobileToolsMenu = document.getElementById("mobile-tools-menu"),
  mobileToolsIcon = document.getElementById("mobile-tools-icon");
mobileToolsButton.addEventListener("click", () => {
  let e = mobileToolsMenu.classList.toggle("hidden");
  mobileToolsIcon.style.transform = e ? "" : "rotate(180deg)"
});
