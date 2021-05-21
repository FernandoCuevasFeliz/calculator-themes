'use strict';
const d = document;
const $carculator = d.querySelector('.container-calculator');
const $btnTheme = d.getElementById('theme');
const themes = d.querySelectorAll('.icon__btn');

const selectTheme = (numTheme = 0) => {
  themes.forEach((item) => {
    item.classList.remove('point');
  });
  themes[numTheme].classList.add('point');
};

// theme load
if (
  localStorage.getItem('theme') === 'dark' ||
  localStorage.getItem('theme') === '' ||
  localStorage.getItem('theme') === null
) {
  selectTheme();
} else if (localStorage.getItem('theme') === 'light') {
  selectTheme(1);
  $carculator.classList.add('light');
} else if (localStorage.getItem('theme') === 'violet') {
  selectTheme(2);
  $carculator.classList.add('violet');
}

// theme selection
$btnTheme.addEventListener('click', (el) => {
  const btn = el.target;

  const theme = btn.getAttribute('data-theme');
  localStorage.setItem('theme', theme);

  if (theme === 'light') selectTheme(1);
  else if (theme === 'violet') selectTheme(2);
  else selectTheme();

  $carculator.classList.remove('light');
  $carculator.classList.remove('violet');
  if (theme !== 'dark') $carculator.classList.add(theme);
});

const $screen = d.getElementById('screen');
const $keyPath = d.getElementById('keyPath');
let restartScreen = false;

$keyPath.addEventListener('click', (e) => {
  const con = e.target.classList.contains('btn');
  const content = e.target.textContent;

  if (restartScreen) {
    $screen.textContent = '';
    restartScreen = false;
  }
  if (con && content !== '=' && content !== 'Del' && content !== 'Reset') {
    if ($screen.textContent === '0') {
      if ($screen.textContent.length === 1) {
        if (isNaN(content)) {
          $screen.textContent += content;
          return;
        }
      }
      $screen.textContent = content;
      return;
    }
    if (content === 'x') {
      $screen.textContent += '*';
      return;
    }
    $screen.textContent += content;
  }

  if (content === 'Del') {
    if ($screen.textContent === 'Error') {
      $screen.textContent = '0';
      return;
    }
    $screen.textContent = $screen.textContent.substring(
      0,
      $screen.textContent.length - 1
    );
  }

  if (content === 'Reset') $screen.textContent = '0';

  if (content === '=') {
    try {
      let result = eval($screen.textContent);
      $screen.textContent = result;
      restartScreen = true;
    } catch (error) {
      $screen.textContent = 'Error';
    }
  }
});
