/**
 * Interface all states need to implement as the event pump will use a stack
 * of these to determine which state the player is in.
 */
export interface State {
    /**
     * Needs reference to state stack to have the ability to pop own
     * state off the stack.
     */
    update(stateStack: State[]);
}