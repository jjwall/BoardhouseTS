import { Vector3 } from "three";

/**
 * Position component.
 */
export interface PositionComponent {
    /** Location vector. */
    loc: Vector3;
    /** Direction vector. */
    dir: Vector3;
    /** Wraparound behavior. */
    wrap: boolean;
}

/**
 * Helper for initializing an entity's position.
 * @param xPos 
 * @param yPos 
 * @param zPos 
 * @param startingDirection optional param. If not specified, direction will be: Vector3(1, 0, 0).
 */
export function setPosition(xPos: number, yPos: number, zPos: number, startingDirection?: Vector3, wrap?: boolean): PositionComponent {
    let position: PositionComponent = { loc: new Vector3(xPos, yPos, zPos), dir: null, wrap: false };

    if (startingDirection) {
        position.dir = startingDirection;
    }
    else {
        position.dir = new Vector3(1, 0, 0);
    }
      
    if (wrap !== undefined) {
        position.wrap = wrap;
    }

    return position;
}