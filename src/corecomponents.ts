/**
 * Position component.
 */
export interface PositionComponent {
    x: number;
    y: number;
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
 */
export interface HitBoxComponent {
    // collideType: Collidables;
    collidesWith: Collidables[];
    height: number;
    width: number;
    onHit: () => void;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 */
export interface HurtBoxComponent {
    collideType: Collidables;
    // collidesWith: Collidables[];
    height: number;
    width: number;
    onHurt: () => void;
}

/**
 * List of all things that can collide with each other. Naming is arbitrary
 * as long as they are properly set in Hit/Hurt Box "collidesWith" property.
 */
export enum Collidables {
    test,
    // ..
}

/**
 * Free function to initialize ControllableComponent to maintain invariance
 * at creation of the object.
 */
export function initializeControls(): ControllableComponent {
    return {
        jump: false,
        attack: false,
        left: false,
        right: false,
    };
}