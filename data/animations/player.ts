import { AnimationSchema, SequenceTypes} from "../../src/animationschema";

export const playerAnim: AnimationSchema = {
    [SequenceTypes.walk]: [
        {
            ticks: 40,
            texture: "../data/textures/msknight.png",
            nextFrame: 1
       },
        {
            ticks: 40,
            texture: "../data/textures/snow.png",
            nextFrame: 0
       }
    ],
    [SequenceTypes.attack]: [{
        ticks: 5,
        texture: "test",
        nextFrame: 5,
    }],
}