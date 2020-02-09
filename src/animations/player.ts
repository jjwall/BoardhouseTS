import { AnimationSchema, SequenceTypes } from "./../components/animation";

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