
/**
 * Animation Component.
 */
export interface AnimationComponent {
    sequence: SequenceTypes;
    blob: AnimationSchema;
    ticks: number;
    frame: number;
}

/**
 * Helper for intializing an entity's animation blob and starting sequence.
 * @param startingSequence 
 * @param animBlob 
 */
export function setAnimation(startingSequence: SequenceTypes, animBlob: AnimationSchema) : AnimationComponent {
    return {
        sequence: startingSequence,
        blob: animBlob,
        ticks: animBlob[startingSequence][0].ticks,
        frame: 0,
    }
}

/**
 * Helper for swapping out an animation sequence.
 * @param sequence 
 * @param anim 
 * @param frame 
 */
export function changeSequence(sequence: SequenceTypes, anim: AnimationComponent, frame: number = 0) : AnimationComponent {
    if (anim.sequence !== sequence) {
        anim.sequence = sequence;
        anim.frame = frame;
    }
    
    return anim;
}

/**
 * Interface used to define format for TypeScript animation data files.
 */
export interface AnimationSchema {
    /**
     * Key into an animation sequence using the
     * index of the SequenceTypes enum.
     */
    [index: number]: Array<{
        /**
         * Number of ticks until the next frame is displayed.
         */
        ticks: number,
        /**
         * Url path to the file of the frame's texture.
         */
        texture: string,
        /**
         * Index of frame that will display once ticks == 0.
         */
        nextFrame: number
    }>;
}

/**
 * List of all possible animation sequences.
 */
export const enum SequenceTypes {
    idle,
    walk,
    run,
    attack
}