import { Group } from "three";
import getStarfield from "./getStarfield.js";

export function createStarGroup(numOfStars) {
    const group = new Group();
    let stars = getStarfield({ numStars: numOfStars });
    group.add(stars);

    return group;
}