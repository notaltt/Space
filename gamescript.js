import { setupCloud, setupGround, updateCloud, updateGround } from './ground.js'
import { getSpacemanRect, setupSpaceman, updateSpaceman, setSpacemanLose } from './spaceman.js'
import { getStoneRect, setupStone, updateStone } from './stones.js'


const scoreElem = document.querySelector("[data-score]");
const runElem = document.querySelector("[data-run]");
const kmElem = document.querySelector("[data-runkm]");
const jumpElem = document.querySelector("[data-jump]");

document.addEventListener("keydown", handleStart, {once: true});

const SPEED_SCALE_INCREASE = 0.00001;

let lastTime; 
let speedScale;
let score;
 
function update(time){
    if(lastTime == null){
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta = time - lastTime;

    updateGround(delta, speedScale);
    updateCloud(delta, speedScale);
    updateSpaceman(delta, speedScale);
    updateStone(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkLose()) return handleLose();

    lastTime = time;
    window.requestAnimationFrame(update);
}

function updateSpeedScale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta){
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
    kmElem.textContent = "You have explored "+Math.floor(score)+" km in space.";
}

function handleStart(){
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupCloud();
    setupSpaceman();
    setupStone();
    runElem.classList.add("hide");
    kmElem.classList.add("hide");
    jumpElem.classList.add("hide");
    window.requestAnimationFrame(update);
}

function checkLose(){
    const spacemanRect = getSpacemanRect();
    return getStoneRect().some(rect => isCollision(rect, spacemanRect));
}

function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    );
}

function handleLose(){
    setSpacemanLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once: true});
        runElem.classList.remove("hide");
        kmElem.classList.remove("hide");
        jumpElem.classList.remove("hide");
    }, 100)
}