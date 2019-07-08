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