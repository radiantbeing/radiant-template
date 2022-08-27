function getPrefersColorScheme() {
  // localStorage의 color-scheme 속성에 따라 결정
  const colorScheme = localStorage.getItem("color-scheme");

  // localStorage에 다크 모드 속성이 없을 경우 OS 설정에 따라 결정
  if (!colorScheme) {
    const preferDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (preferDark) {
      return "dark";
    }
    return "light";
  }

  return colorScheme;
}

// prefer-color-scheme 확인
let prefersColorScheme = getPrefersColorScheme();

// body에 다크 모드를 위한 data-theme 속성 부여
document.body.dataset.theme = prefersColorScheme;

function createElement(tag) {
  const temp = document.createElement("template");
  temp.innerHTML = tag;
  return temp.content;
}

async function renderNavbar() {
  const response = await fetch("./radiant_assets/js/components/navbar.html");
  const navBarString = await response.text();
  const navbarElement = createElement(navBarString);
  document.body.prepend(navbarElement);
}

// 네비게이션 바 렌더링
await renderNavbar();

async function renderMenuButton() {
  const response = await fetch(
    "./radiant_assets/js/components/menu_button.html"
  );
  const menuButtonString = await response.text();
  const menuButtonElement = createElement(menuButtonString);
  document.body.append(menuButtonElement);
}

// 메뉴 버튼 렌더링
await renderMenuButton();

function assignSrc(colorScheme) {
  const brandLogo = document.querySelector("#navbarBrandLogo");
  brandLogo.src = `radiant_assets/img/${colorScheme}_mode/icon/brand_logo.svg`;

  // github 링크 없애고 싶으면 삭제
  const githubLink = document.querySelector("#githubLink");
  githubLink.src = `radiant_assets/img/${colorScheme}_mode/icon/github.svg`;

  const darkModeButton = document.querySelector("#darkModeButton");
  darkModeButton.src = `radiant_assets/img/${colorScheme}_mode/icon/dark_mode.svg`;

  const menuButton = document.querySelector("#menuButton");
  menuButton.src = `radiant_assets/img/${colorScheme}_mode/icon/menu_open.svg`;
}

// 네비게이션 바의 아이콘 경로 지정
assignSrc(prefersColorScheme);

// 다크 모드 버튼 이벤트 리스너 추가
const darkModeButton = document.querySelector("#darkModeButton");
darkModeButton.onclick = (event) => {
  event.preventDefault();

  // prefersColorScheme을 토글
  if (prefersColorScheme === "dark") {
    prefersColorScheme = "light";
  } else {
    prefersColorScheme = "dark";
  }

  localStorage.setItem("color-scheme", prefersColorScheme);
  document.body.dataset.theme = prefersColorScheme;
  assignSrc(prefersColorScheme);
};

// 메뉴 버튼 이벤트 리스너 추가
const menuButton = document.querySelector("#menuButton");
menuButton.onclick = (event) => {
  event.preventDefault();
  const navsContainer = document.querySelector("#navsContainer");
  navsContainer.classList.toggle("active");
};
