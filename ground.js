import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomPropery.js";

const SPEED = 0.05;
const groundElem = document.querySelectorAll("[data-ground]");

export function setupGround(){
    setCustomProperty(groundElem[0], "--left", 0);
    setCustomProperty(groundElem[1], "--left", 100);
}

export function updateGround(delta, speedScale){
    groundElem.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

        if(getCustomProperty(ground, "--left") <= -100){
            incrementCustomProperty(ground, "--left", 200);
        }
    })

}