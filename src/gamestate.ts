import { State } from "./state";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly rect: ClientRect | DOMRect;
    constructor(Canvas: HTMLCanvasElement) {
        this.canvas = Canvas;
        this.ctx = Canvas.getContext("2d");
        this.rect = Canvas.getBoundingClientRect();
    }
    public update(stateStack: State[]) {
        // ...

        // pull in all system free functions and call each in the proper order
    }
}