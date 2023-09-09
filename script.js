'use strict';

// --------------------- THEME MANIPULATION ---------------------

const themes = {
  retro: document.querySelector('.retro'),
  navyBlue: document.querySelector('.navy-blue'),
};

for (const theme in themes) {
  themes[theme].addEventListener('click', function () {
    changeTheme(themes[theme].className);
  });
}

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('currentTheme');
  if (savedTheme) changeTheme(savedTheme);
};

const changeTheme = function (themeName) {
  // naming needs to be changed so we can access
  // themes that exist in themes.css
  const themeCSS = 'theme--' + themeName;

  document.body.classList.remove(
    'theme--' + localStorage.getItem('currentTheme')
  );
  document.body.classList.add(themeCSS);
  localStorage.setItem('currentTheme', themeName);
};

initializeTheme();

// ------------------- HANDLING KEY PRESS -------------------

const handleKeyPress = function (e) {
  console.log(e);

  e.preventDefault();
  const keyElement = document.querySelector('.' + e.code.toLowerCase());

  if (e.type === 'keydown') {
    keyElement.classList.add('key-pressing-simulation');
  } else if (e.type === 'keyup') {
    keyElement.classList.remove('key-pressing-simulation');
  }

  if (!keyElement.classList.contains('key--pressed'))
    keyElement.classList.add('key--pressed');

  // 'Meta' or 'OS' is a bit tricky and only in this way
  // we can reliably remove the class from the element
  if (e.key === 'Meta' || e.key === 'OS')
    keyElement.classList.remove('key-pressing-simulation');
};

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyPress);

// --------------------- CHANGING LAYOUT ---------------------

const btnToggleLayout = document.querySelector('.btn-toggle-layout');
const fullSizeLayout = document.querySelector('.full-size-layout');
const TKLLayout = document.querySelector('.tkl-layout');

const ToggleKeyboardLayout = function () {
  const themeAndLayout = document.querySelector('.theme-and-layout');
  const keyboard = document.querySelector('.keyboard');
  const numpad = document.querySelector('.numpad');

  if (btnToggleLayout.checked) {
    numpad.classList.add('hidden--step1');
    themeAndLayout.style.maxWidth = '97rem';
    // timeout added for smooth transition between applying --step1 & --step2
    setTimeout(function () {
      keyboard.classList.remove('full-size');
      keyboard.classList.add('tkl');
      numpad.classList.add('hidden--step2');
    }, 150);
  } else {
    themeAndLayout.style.maxWidth = '120rem';
    keyboard.classList.add('full-size');
    keyboard.classList.remove('tkl');
    numpad.classList.remove('hidden--step1');
    numpad.classList.remove('hidden--step2');
  }
};

btnToggleLayout.addEventListener('click', ToggleKeyboardLayout);
fullSizeLayout.addEventListener('click', function () {
  btnToggleLayout.checked = false;
  ToggleKeyboardLayout();
});
TKLLayout.addEventListener('click', function () {
  btnToggleLayout.checked = true;
  ToggleKeyboardLayout();
});
