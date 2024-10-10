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

  // Edge case mentioned in https://github.com/Mostafa-Abbasi/KeyboardTester/issues/4
  // Detect AltGr key press (Alt + Control pressed simultaneously)
  const isAltGr = e.key === 'AltGraph';

  // Ignore the left Control key if AltGr is pressed
  if (isAltGr) {
    document
      .querySelector('.' + 'controlleft')
      .classList.remove('key-pressing-simulation');

    document
      .querySelector('.' + 'controlleft')
      .classList.remove('key--pressed');
  }

  const keyElement = document.querySelector('.' + e.code.toLowerCase());

  if (e.type === 'keydown') {
    keyElement.classList.add('key-pressing-simulation');
  } else if (e.type === 'keyup') {
    keyElement.classList.remove('key-pressing-simulation');
  }

  if (!keyElement.classList.contains('key--pressed')) {
    keyElement.classList.add('key--pressed');
  }

  // Handle special Meta/OS key case
  if (e.key === 'Meta' || e.key === 'OS') {
    keyElement.classList.remove('key-pressing-simulation');
  }
};

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyPress);

// --------------------- CHANGING LAYOUT ---------------------

const slider = document.getElementById('layoutSlider');
const output = document.querySelector('.slider-value');

const fullSizeLayout = document.querySelector('.full-size-layout');
const TKLLayout = document.querySelector('.tkl-layout');

const themeAndLayout = document.querySelector('.theme-and-layout');
const keyboard = document.querySelector('.keyboard');
// related to tkl
const numpad = document.querySelector('.numpad');
// related to 75% layout configuration
const regions = document.querySelectorAll('.region');
const functionRegion = document.querySelector('.function');
const controlRegion = document.querySelector('.system-control');
const navigationRegion = document.querySelector('.navigation');
const fourthRow = document.querySelector('.fourth-row');
const fifthRow = document.querySelector('.fifth-row');

// deleted keys in 75%
const btnScrollLock = document.querySelector('.scrolllock');
const btnInsert = document.querySelector('.insert');
const btnContextMenu = document.querySelector('.contextmenu');

// remapped keys in 75%
const btnDelete = document.querySelector('.delete');
const btnHome = document.querySelector('.home');
const btnEnd = document.querySelector('.end');
const btnPgUp = document.querySelector('.pageup');
const btnPgDn = document.querySelector('.pagedown');

// Function to update the layout based on slider value
function updateLayout() {
  const sliderValue = parseInt(slider.value);

  // Update output text based on slider position
  switch (sliderValue) {
    case 1:
      output.textContent = 'Full';
      changeToFullSize();
      break;
    case 2:
      output.textContent = 'TKL';
      changeToTKL();
      break;
    case 3:
      output.textContent = '75%';
      changeTo75();
      break;
    default:
      break;
  }
}

const changeToFullSize = function () {
  undo75();
  undoTKL();
  themeAndLayout.style.maxWidth = '120rem';
  keyboard.classList.add('full-size');
};

const undoTKL = function () {
  keyboard.classList.remove('tkl');
  numpad.classList.remove('hidden--step1');
  numpad.classList.remove('hidden--step2');
};

const changeToTKL = function () {
  return new Promise(resolve => {
    undo75();

    numpad.classList.add('hidden--step1');
    themeAndLayout.style.maxWidth = '98rem';
    // timeout added for smooth transition between applying --step1 & --step2
    setTimeout(function () {
      keyboard.classList.remove('full-size');

      keyboard.classList.add('tkl');
      numpad.classList.add('hidden--step2');
      resolve(); // Resolving the promise when transition is complete
    }, 150);
  });
};

const updateStylesFor75 = is75Percent => {
  const paddingValue = is75Percent ? '0.15rem' : '0.5rem';
  const displayValue = is75Percent ? 'none' : 'flex';
  const transformValue = is75Percent ? '-66.7%' : '0%';

  keyboard.classList.toggle('seventy-five-percent', is75Percent);
  regions.forEach(region => (region.style.padding = paddingValue));

  functionRegion.style.gridTemplateColumns = is75Percent
    ? '2fr 0 repeat(4, 2fr) 0 repeat(4, 2fr) 0 repeat(4,2fr)'
    : '2fr 2fr repeat(4, 2fr) 1fr repeat(4, 2fr) 1fr repeat(4,2fr)';
  functionRegion.style.width = is75Percent ? '86.7%' : '100%';

  controlRegion.style.width = is75Percent ? '95%' : '100%';
  controlRegion.style.transform = `translateX(${transformValue})`;
  btnScrollLock.style.display = displayValue;
  btnInsert.style.display = displayValue;
  btnContextMenu.style.display = displayValue;

  const btnDeleteTransform = is75Percent
    ? 'translateY(-106%)'
    : 'translateY(0%)';
  btnDelete.style.gridColumn = is75Percent ? 3 : 1;
  btnDelete.style.gridRow = is75Percent ? 1 : 2;
  btnDelete.style.transform = btnDeleteTransform;

  btnHome.style.gridColumn = is75Percent ? 3 : 2;
  btnHome.style.gridRow = is75Percent ? 1 : 1;

  btnEnd.style.gridColumn = is75Percent ? 3 : 2;
  btnEnd.style.gridRow = is75Percent ? 2 : 2;

  btnPgUp.style.gridColumn = is75Percent ? 3 : 3;
  btnPgUp.style.gridRow = is75Percent ? 3 : 1;

  btnPgDn.style.gridColumn = is75Percent ? 3 : 3;
  btnPgDn.style.gridRow = is75Percent ? 4 : 2;

  navigationRegion.style.transform = `translateX(${transformValue})`;

  fourthRow.style.gridTemplateColumns = is75Percent
    ? '2.29fr repeat(10, 1fr) 1.75fr 1.04fr'
    : '2.29fr repeat(10, 1fr) 2.79fr';

  const fifthRowColumns = is75Percent
    ? 'repeat(3, 1.29fr) 6.36fr repeat(3, 1fr) 2.15fr'
    : 'repeat(3, 1.29fr) 6.36fr repeat(4, 1.29fr)';
  fifthRow.style.gridTemplateColumns = fifthRowColumns;
};

const undo75 = () => {
  updateStylesFor75(false);
};

const changeTo75 = async () => {
  await changeToTKL(); // Wait for the transition in changeToTKL() to complete
  themeAndLayout.style.maxWidth = '85rem';
  updateStylesFor75(true);
};

// Event listener for slider change
slider.addEventListener('input', updateLayout);

// Initial layout update based on default slider value
updateLayout();
