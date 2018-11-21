/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 * 
 * Consider making class to ensure height / width aren't negative.
 */
export interface HitBoxComponent {
    collidesWith: Collidables[]
    height: number;
    width: number;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 * 
 * Consider making class to ensure height / width aren't negative.
 */
export interface HurtBoxComponent {
    collidesWith: Collidables[]
    height: number;
    width: number;
}

/**
 * List of all things that can collide with each other. Naming is arbitrary
 * as long as they are properly set in Hit/Hurt Box "collidesWith" property.
 */
export enum Collidables {
    // ..
}