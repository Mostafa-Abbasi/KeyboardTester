'use strict';

const handleKeyPress = function (e) {
  e.preventDefault();
  const keyElement = document.querySelector('.' + e.code.toLowerCase());

  if (e.type === 'keydown') {
    keyElement.classList.add('key-pressing-simulation');
  } else if (e.type === 'keyup') {
    keyElement.classList.remove('key-pressing-simulation');
  }

  if (!keyElement.classList.contains('key-pressed'))
    keyElement.classList.add('key-pressed');

  // 'Meta' or 'Windows key' is a bit tricky and only in
  // this way we can reliably remove the class from it
  if (e.key === 'Meta') keyElement.classList.remove('key-pressing-simulation');
};

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyPress);
