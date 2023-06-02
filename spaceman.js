import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomPropery.js";

const spacemanElem = document.querySelector("[data-spaceman]");
const JUMP_SPEED = .2;
const GRAVITY = .00080;
const SPACEMAN_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let spacemanFrame;
let currentFrameTime;
let Yvelocity;

export function setupSpaceman(){
    isJumping = false;
    spacemanFrame = 0;
    currentFrameTime = 0;
    Yvelocity = 0;
    setCustomProperty(spacemanElem, "--bottom", 20);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}

export function updateSpaceman(delta, speedScale){
    handleRun(delta, speedScale);
    handleJump(delta);
}


function handleRun(delta, speedScale){
    if(isJumping){
        spacemanElem.src = 'spaceman jump.png';
        return;
    }

    if(currentFrameTime >= FRAME_TIME){
        spacemanFrame = (spacemanFrame + 1) % SPACEMAN_FRAME_COUNT;
        if(spacemanFrame == 1){
            spacemanElem.src = 'spaceman 1.png';
        }else{
            spacemanElem.src = 'spaceman 0.png';
        }
        currentFrameTime -= FRAME_TIME;
    }

    currentFrameTime += delta * speedScale;
}

function handleJump(delta){
    if(!isJumping) return

    incrementCustomProperty(spacemanElem, "--bottom", Yvelocity * delta);
    
    if(getCustomProperty(spacemanElem, "--bottom") <= 20){
        setCustomProperty(spacemanElem, "--bottom", 20)
        isJumping = false;
    } 

    Yvelocity -= GRAVITY * delta;
}

function onJump(e){
    if(e.code !== "Space" || isJumping) return

    Yvelocity = JUMP_SPEED;
    isJumping = true;
}

export function getSpacemanRect(){
    return spacemanElem.getBoundingClientRect();
}

export function setSpacemanLose(){
    
}