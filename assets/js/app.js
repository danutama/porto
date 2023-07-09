//*========== KEEP URL ==========*//
$(window).on('hashchange', function (e) {
  history.replaceState('', document.title, e.originalEvent.oldURL);
});
//*========== END ==========*//



//*========== LOADING SCREEN ==========*//
$(window).on('load', function () {
  setTimeout(function () {
    $('.loading').fadeOut(200);
  }, 2000); // delay selama 3 detik
});
//*========== END ==========*//



//*========== SCROLL TO TOP BTN ==========*//
function scrollToTop() {
  if (typeof window.scrollTo === "function") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  } else {
    window.scrollTo(0, 0);
  }
}
//*========== END ==========*//



//*========== BOTTOM SHEET ==========*//
const openSheetButton = document.querySelectorAll('.open-sheet');
const sheet = document.getElementById('sheet');
const sheetContents = sheet.querySelector('.contents');
const draggableArea = sheet.querySelector('.draggable-area');

let sheetHeight; // in vh

const setSheetHeight = (value) => {
  sheetHeight = Math.max(0, Math.min(100, value));
  sheetContents.style.height = `${sheetHeight}vh`;

  if (sheetHeight === 100) {
    sheetContents.classList.add('fullscreen');
  } else {
    sheetContents.classList.remove('fullscreen');
  }
};

const setIsSheetShown = (value) => {
  sheet.setAttribute('aria-hidden', String(!value));
};

// Open the sheet when clicking the 'open sheet' button
openSheetButton.forEach(button => {
  button.addEventListener("click", () => {
    setSheetHeight(Math.min(60, (720 / window.innerHeight) * 100));
    setIsSheetShown(true);
  });
});

// Hide the sheet when clicking the 'close' button
sheet.querySelector('.close-sheet').addEventListener('click', () => {
  setIsSheetShown(false);
});

// Hide the sheet when clicking the background
sheet.querySelector('.overlay').addEventListener('click', () => {
  setIsSheetShown(false);
});

const touchPosition = (event) => (event.touches ? event.touches[0] : event);

let dragPosition;

const onDragStart = (event) => {
  dragPosition = touchPosition(event).pageY;
  sheetContents.classList.add('not-selectable');
  draggableArea.style.cursor = document.body.style.cursor = 'grabbing';
};

const onDragMove = (event) => {
  if (dragPosition === undefined) return;

  const y = touchPosition(event).pageY;
  const deltaY = dragPosition - y;
  const deltaHeight = (deltaY / window.innerHeight) * 100;

  setSheetHeight(sheetHeight + deltaHeight);
  dragPosition = y;
};

const onDragEnd = () => {
  dragPosition = undefined;
  sheetContents.classList.remove('not-selectable');
  draggableArea.style.cursor = document.body.style.cursor = '';

  if (sheetHeight < 55) {
    setIsSheetShown(false);
  } else if (sheetHeight > 65) {
    setSheetHeight(100);
  } else {
    setSheetHeight(60);
  }

  // Prevent scrolling on touch devices after dragging
  document.body.style.overflow = 'auto';
};

draggableArea.addEventListener('mousedown', onDragStart);
draggableArea.addEventListener('touchstart', (event) => {
  onDragStart(event);
  document.body.style.overflow = 'hidden'; // Prevent scrolling on touch devices during dragging
});

window.addEventListener('mousemove', onDragMove);
window.addEventListener('touchmove', onDragMove);

window.addEventListener('mouseup', onDragEnd);
window.addEventListener('touchend', onDragEnd);
//*========== END ==========*//



//*========== SHOW TODAY DATE ==========*//
const dateElement = document.getElementById('date');
const options = { month: 'long', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);
//*========== END ==========*//



/*========== SCROLL ACTIVE NAVBAR ==========*/
const header = document.getElementById('nav');
const activeHeader = function () {
  window.scrollY > 50 ? header.classList.add('active') : header.classList.remove('active');
};

window.addEventListener('scroll', activeHeader);
/*========== END ==========*/



/*========== SCROLL SECTIONS ACTIVE LINK ==========*/
function scrollActive() {
  var sections = document.querySelectorAll('section');

  sections.forEach(function (section) {
    if (section.getBoundingClientRect().top <= 50) {
      var id = section.getAttribute('id');
      var navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(function (link) {
        link.classList.remove('active');

        if (link.getAttribute('href').slice(1) === id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', scrollActive);
//*========== END ==========*//



/*========== DARK LIGHT THEME ==========*/
const themeToggle = document.querySelector('.switch input');
const darkThemeClass = 'dark-theme';

const toggleDarkTheme = () => {
  document.body.classList.toggle(darkThemeClass);
  if (document.body.classList.contains(darkThemeClass)) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
};

const selectedTheme = localStorage.getItem('theme');
if (selectedTheme === 'dark') {
  document.body.classList.add(darkThemeClass);
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', toggleDarkTheme);
//*========== END ==========*//



//*========== HIGHLIGHT JS ==========*//
document.addEventListener('DOMContentLoaded', (event) => {
  hljs.highlightAll();
  hljs.initLineNumbersOnLoad();
});
//*========== END ==========*//



//*========== COPY CODE BTN - HIGHLIGHT JS ==========*//
document.getElementById('copyButton').addEventListener('click', function () {
  var codeElement = document.querySelector('.pre-code');
  var code = codeElement.innerText;
  var textarea = document.createElement('textarea');
  textarea.value = code;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  this.innerText = 'Copied!';
});
//*========== END ==========*//



//*========== HOVER IMAGE - HIGHLIGHT CODE ==========*//
const gambar = document.getElementById('codeImage');

gambar.addEventListener('mousemove', rotateImage);

function rotateImage(e) {
  const gambarRect = gambar.getBoundingClientRect();
  const gambarCenterX = gambarRect.left + gambarRect.width / 2;
  const gambarCenterY = gambarRect.top + gambarRect.height / 2;
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const angleX = (mouseX - gambarCenterX) / gambarRect.width * 30;
  const angleY = (gambarCenterY - mouseY) / gambarRect.height * 30;
  const angleZ = Math.atan2(mouseY - gambarCenterY, mouseX - gambarCenterX) * (180 / Math.PI);

  gambar.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg) rotateZ(${angleZ}deg)`;
}

gambar.addEventListener('mouseleave', resetRotation);

function resetRotation() {
  gambar.style.transform = 'none';
}
//*========== END ==========*//



//*========== MIXITUP JS ==========*//
$(document).ready(function () {
  var mixer = mixitup('.project-box', {
    animation: {
      duration: 0,
    },
    load: {
      filter: '.php',
    },
  });
});
//*========== END ==========*//



//*========== BOOTSTRAP TOOLTIP ==========*//
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
//*========== END ==========*//



//*========== GITHUB REPO ==========*//
fetch('https://api.github.com/users/danuapratama/repos')
  .then((response) => response.json())
  .then((data) => {
    const repoCount = data.length;
    const username = data[0].owner.login;

    let starsCount = 0;
    data.forEach((repo) => {
      starsCount += repo.stargazers_count;
    });

    document.getElementById('repoCount').textContent = repoCount;
    document.getElementById('username').textContent = username;
    document.getElementById('star').textContent = `${starsCount}`;
  })
  .catch((error) => {
    console.error(error);
  });
//*========== END ==========*//



//*========== LOTTIEFLOW ICON ANIMATION ==========*//
var animation1 = bodymovin.loadAnimation({
  container: document.getElementById('lottie-animation1'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/js/lottieflow-attention-07-000000-easey.json'
})
//*========== END ==========*//