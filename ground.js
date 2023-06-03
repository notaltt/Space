import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomPropery.js";

const SPEED = 0.05;
const groundElem = document.querySelectorAll("[data-ground]");
const cloudElem = document.querySelectorAll("[data-cloud]")

export function setupGround(){
    setCustomProperty(groundElem[0], "--left", 0);
    setCustomProperty(groundElem[1], "--left", 100);
}

export function setupCloud(){
    setCustomProperty(cloudElem[0], "--left", 0);
    setCustomProperty(cloudElem[1], "--left", 100);
}

export function updateGround(delta, speedScale){
    groundElem.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

        if(getCustomProperty(ground, "--left") <= -100){
            incrementCustomProperty(ground, "--left", 200);
        }
    })
}

export function updateCloud(delta, speedScale){
    cloudElem.forEach(cloud => {
        incrementCustomProperty(cloud, "--left", delta * speedScale * SPEED * -1);

        if(getCustomProperty(cloud, "--left") <= -100){
            incrementCustomProperty(cloud, "--left", 200);
        }
    })
}