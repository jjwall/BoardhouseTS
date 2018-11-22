/**
 * Position component.
 */
export interface PositionComponent {
    x: number;
    y: number;
    xVel: number;
    yVel: number;
}

/**
 * Texture component. Contingent on changing based on
 * PixiJS implementation details.
 * Consider making class to ensure height / width aren't negative
 */
export interface TextureComponent {
    /**
     * Can be null i.e. invisible texture.
     */
    image: HTMLImageElement;
    height: number;
    width: number;
}

/**
 * Controllable component.
 */
export interface ControllableComponent {
    jump: boolean;
    attack: boolean;
    left: boolean;
    right: boolean;
}

/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 * 
 * Consider making class to ensure height / width aren't negative.
 */
export interface HitBoxComponent {
    collidesWith: Collidables[];
    height: number;
    width: number;
    x: number;
    y: number;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 * 
 * Consider making class to ensure height / width aren't negative.
 */
export interface HurtBoxComponent {
    collidesWith: Collidables[];
    height: number;
    width: number;
    x: number;
    y: number;
}

/**
 * List of all things that can collide with each other. Naming is arbitrary
 * as long as they are properly set in Hit/Hurt Box "collidesWith" property.
 */
export enum Collidables {
    // ..
}

/**
 * Free function to initialize ControllableComponent to maintain invariance
 * at creation of the object.
 */
function initializeControls(): ControllableComponent {
    return {
        jump: false,
        attack: false,
        left: false,
        right: false,
    };
}