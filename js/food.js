import { getRandomCanvasPosition } from './helpers.js';
import state, { dom } from './state.js';


const food = {
    x: 0,
    y: 0,
    interval: 6000,
    minInterval: 3500,
    foodAnimation: null,
}


function setFood() {
    const random = getRandomCanvasPosition();
    dom.sounds.food.play();
    food.x = random.x;
    food.y = random.y;
}


function eatFood() {
    food.x = 0 - state.unit;
    food.y = 0 - state.unit;
}


export default food;
export {
    setFood,
    eatFood,
}