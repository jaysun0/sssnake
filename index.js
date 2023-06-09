import state, { dom, showMessage } from './js/state.js';
import { pauseGame, startGame } from './js/game.js';
import { createNewSnake } from './js/snake.js';
import { eatFood } from './js/food.js';
import './js/directionMobile.js';



dom.btns.play.addEventListener('click', (event) => {
  startGame();
  event.target.blur();
});


dom.btns.pause.addEventListener('click', (event) => {
  pauseGame();
  event.target.blur();
});


dom.btns.history.addEventListener('click', () => {
  pauseGame();
  state.isModalOpen = true;
  let scores = localStorage.getItem('snake-scores');

  if (scores) {
    dom.bestScore.classList.remove('hidden');
    dom.bestScoreNumber.textContent = localStorage.getItem('snake-best');

    const container = document.createElement('div');
    scores = scores.split(',');
    scores.forEach((score, ind) => {
      const p = document.createElement('p');
      const number = document.createElement('span');
      number.classList.add('message__history-number');
      number.textContent = score;
      p.textContent = `${++ind}) `;
      p.appendChild(number);
      container.appendChild(p);
    });
    showMessage('game history', container);
  } else showMessage('no scores yet');

  dom.message.classList.remove('hidden');
});


dom.btns.messageOk.addEventListener('click', () => {
  dom.message.classList.add('hidden');
  dom.bestScore.classList.add('hidden');
  state.isModalOpen = false;
});


function setCanvasSize() {
  const bodyWidth = document.body.clientWidth;

  if (bodyWidth < 750) {
    const canvasSize = Math.floor(bodyWidth / state.unit) * state.unit;
    dom.canvasWrapper.classList.add('mobile');
    dom.menuWrapper.classList.add('mobile');
    dom.canvas.width = canvasSize;
    dom.canvas.height = canvasSize;
    if (bodyWidth < 600) state.unit = 18;
    else if (bodyWidth < 500) state.unit = 16;
    else if (bodyWidth < 400) state.unit = 14;
  } else {
    dom.canvas.width = state.fieldSize * state.unit;
    dom.canvas.height = state.fieldSize * state.unit;
  }
}


(function () {
  setCanvasSize();
  eatFood();
  createNewSnake();
})();