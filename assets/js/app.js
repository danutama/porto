/*========== SCROLL ACTIVE NAVBAR ==========*/
const header = document.getElementById('nav');
const activeHeader = function () {
  window.scrollY > 50 ? header.classList.add('active') : header.classList.remove('active');
};

window.addEventListener('scroll', activeHeader);
/*========== END ==========*/

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
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
// ============== END ============== //

/*========== DARK LIGHT THEME ==========*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun');

// We validate if the user previously choose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

// Show todays date
const dateElement = document.getElementById('date');
const options = { month: 'short', day: 'numeric' };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// ========== Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// ========== GitHub Repo
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
