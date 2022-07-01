function createElement(string) {
  const temp = document.createElement("template");
  temp.innerHTML = string;
  return temp.content;
}

const toggleButton = createElement(/* html */ `
    <a class="navbar-toggle" id="navbarToggle" href="#">
        <img src="./img/icon/icon_toggle_02_dark.svg" alt="toggle button">
    </a>`);

document.body.appendChild(toggleButton);

const navbarToggle = document.querySelector("#navbarToggle");
const navbarNavs = document.querySelector("#navbarNavs");
navbarToggle.addEventListener("click", (e) => {
  e.preventDefault();
  navbarNavs.classList.toggle("active");
});
