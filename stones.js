import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomPropery.js";

const SPEED = 0.05;
const STONE_INTERVAL_MIN = 500;
const STONE_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextStoneTime;
export function setupStone(){
    nextStoneTime = STONE_INTERVAL_MIN;
    document.querySelectorAll("[data-stone]").forEach(stone =>{
        stone.remove();
    })
}

export function updateStone(delta, speedScale){
    document.querySelectorAll("[data-stone]").forEach(stone =>{
        incrementCustomProperty(stone, "--left", delta * speedScale * SPEED * -1);
        if(getCustomProperty(stone, "--left") <= -100){
            stone.remove();
        }
    })

    if(nextStoneTime <= 0){
        createStone();
        nextStoneTime = randomNumberBetween(STONE_INTERVAL_MIN, STONE_INTERVAL_MAX) / speedScale;
    }
    
    nextStoneTime -= delta;
}

function createStone(){
    const stone = document.createElement("img");
    stone.dataset.stone = true;
    stone.src = 'stones.png';
    stone.classList.add("stone");
    setCustomProperty(stone, "--left", 100);
    worldElem.append(stone);
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getStoneRect(){
    return [...document.querySelectorAll("[data-stone]")].map(stone => {
        return stone.getBoundingClientRect();
    })
}