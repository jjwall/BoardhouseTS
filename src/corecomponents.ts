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
    attackTimer: number;
    attacked: boolean;
    left: boolean;
    right: boolean;
}

/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 */
export interface HitBoxComponent {
    // collideType: Collidables;
    collidesWith: HurtTypes[];
    height: number;
    width: number;
    onHit: () => void;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 */
export interface HurtBoxComponent {
    type: HurtTypes;
    // collidesWith: Collidables[];
    height: number;
    width: number;
    onHurt: () => void;
}

/**
 * Timer for short-lived entities.
 */
export interface TimerComponent {
    ticks: number;
}

/**
 * List of all things that can collide with each other. Naming is arbitrary
 * as long as they are properly set in Hit/Hurt Box "collidesWith" property.
 */
export enum HurtTypes {
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
        attackTimer: 0,
        attacked: false,
        left: false,
        right: false,
    };
}