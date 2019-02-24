import { AnimationSchema } from "../../src/animationschema";
import { SequenceTypes } from "../../src/enums";

export const playerAnim: AnimationSchema = {
    [SequenceTypes.walk]: [
        {
            ticks: 0,
            texture: "./data/textures/msknight.png",
            nextFrame: 0
       },
    ],
    [SequenceTypes.attack]: [
        {
            ticks: 0,
            texture: "./data/textures/snow.png",
            nextFrame: 0
       },
    ],
}