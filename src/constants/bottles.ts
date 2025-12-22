import { BottleType } from "../types/bottles";
import bottle1 from "../../public/assets/bottles/b2.png";
import bottle2 from "../../public/assets/bottles/b3.png";

export const bottleOptions: { type: BottleType, name: string, image: string }[] = [
    { type: 'burgundy', name: 'Burgundy Bottle', image: bottle1.src },
    { type: 'alsace', name: 'Alsace Bottle', image: bottle2.src }

];

