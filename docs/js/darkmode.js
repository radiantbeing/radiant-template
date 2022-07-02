
if (localStorage.getItem("dark-mode") === null) {
    const preferDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem("dark-mode", preferDarkMode);
}

const preferDarkMode = JSON.parse(localStorage.getItem("dark-mode"));

if (preferDarkMode) document.body.dataset.theme = "dark";
else document.body.dataset.theme = "false";

function toggleDarkMode() {
    if (document.body.dataset.theme === "dark") {
        document.body.dataset.theme = "light";
        localStorage.setItem("dark-mode", "false");
    } else {
        document.body.dataset.theme = "dark";
        localStorage.setItem("dark-mode", "true");
    }

}

const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", e => {
    e.preventDefault();
    toggleDarkMode();
})
