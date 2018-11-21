/**
 * Interface all states need to implement as the event pump will use a stack
 * of these to determine which state the player is in.
 */
export interface State {
    update();
}