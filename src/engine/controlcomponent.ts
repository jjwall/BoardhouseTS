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
