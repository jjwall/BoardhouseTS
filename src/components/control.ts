import { Camera, Vector3 } from "three";

/**
 * Control component.
 */
export interface ControlComponent {
    jump: boolean;
    attack: boolean;
    attackTimer: number;
    attacked: boolean;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    //just a reference
    camera: Camera;
    mousePos: Vector3;
}

/**
 * Helper for initializing ControlComponent with starting values.
 */
export function setControl(): ControlComponent {
    return {
        jump: false,
        attack: false,
        attackTimer: 0,
        attacked: false,
        left: false,
        right: false,
        up: false,
        down: false,
        camera: null,
        mousePos: null,
    };
}