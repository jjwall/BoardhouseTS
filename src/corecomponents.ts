/**
 * Position component.
 */
export interface PositionComponent {
    x: number;
    y: number;
}

/**
 * Rudimentary velocity... will replace directions with
 * angle and magnitude later on
 */
export interface VelocityComponent {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    speed: number;
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
 * Animation Component. Obj is to be set via a json file.
 * Change the sequence string to change which animation is
 * being played.
 */
export interface AnimationComponent {
    sequence: string;
    obj: object;
    ticks: number;
    frame: number;
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

export function initializeAnimation(startingAnim: string, animObj: object) : AnimationComponent {
    return {
        sequence: startingAnim,
        obj: animObj,
        ticks: animObj[startingAnim][0]["ticks"],
        frame: 0,
    }
}