import {
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
} from "three";
import { 
    AnimationComponent,
    HurtBoxComponent,
    HitBoxComponent,
} from "./corecomponents";
import { Resources } from "../resourcemanager";
import { SequenceTypes } from "./enums";

/**
 * Helper method to play audio.
 * @param url Path to audio file.
 * @param volume Optional param to set the volume. Must be >= 0 && <= 1.
 * @param loop Optional param to determine if the audio should loop.
 */
export function playAudio(url: string, volume?: number, loop?: boolean) : void {
    let audio = Resources.instance.getAudioElement(url);

    if (volume) {
        if (volume < 0 || volume > 1)
            throw Error("volume can't be a value less than 0 or greater than 1.");

        audio.volume = volume;
    }

    if (loop) {
        audio.loop = loop;
    }

    audio.play()
        .catch(function(ex) {
            throw Error(`Your browser threw "${ex}". To resolve this on Chrome, go to chrome://flags/#autoplay-policy and set the Autoplay-policy to "No user gesture is required."`);
        });
}

/**
 * Helper for swapping out an animation sequence.
 * @param sequence 
 * @param anim 
 * @param frame 
 */
export function changeSequence(sequence: SequenceTypes, anim: AnimationComponent, frame: number = 0) : AnimationComponent {
    anim.sequence = sequence;
    anim.frame = frame;
    return anim;
}

/**
 * Helper to set visuals for a hurtBox.
 * Used for testing hit collision assumptions.
 * @param entMesh
 * @param hurtBox
 */
export function setHurtBoxGraphic(entMesh: Mesh, hurtBox: HurtBoxComponent) : void {
    const hurtBoxGeometry = new PlaneGeometry(hurtBox.width, hurtBox.height);
    const hurtBoxMaterial = new MeshBasicMaterial({ color: "#228B22" });
    const hurtBoxMesh = new Mesh(hurtBoxGeometry, hurtBoxMaterial);
    hurtBoxMesh.position.x += hurtBox.offsetX;
    hurtBoxMesh.position.y += hurtBox.offsetY;
    entMesh.add(hurtBoxMesh);
}

/**
 * Helper to set visuals for a hitBox.
 * Used for testing hit collision assumptions.
 * @param entMesh
 * @param hitBox
 */
export function setHitBoxGraphic(entMesh: Mesh, hitBox: HitBoxComponent) : void {
    const hitBoxGeometry = new PlaneGeometry(hitBox.width, hitBox.height);
    const hitBoxMaterial = new MeshBasicMaterial({ color: "#DC143C" });
    const hitBoxMesh = new Mesh(hitBoxGeometry, hitBoxMaterial);
    hitBoxMesh.position.x += hitBox.offsetX;
    hitBoxMesh.position.y += hitBox.offsetY;
    entMesh.add(hitBoxMesh);
}

/**
 * Clears all rendered elements from container and it's children.
 * @param baseContainer 
 */
// export function clearStage(baseContainer: PIXI.Container) {
//     baseContainer.destroy({children:true, texture:true, baseTexture:true});
// }

/**
 * 
 * @param array generic array
 * 
 * Helper function that returns the last element of the array.
 * Returns ``undefined`` if the array's length is zero.
 */
export function last<T>(array: T[]) : T {
    return array[array.length - 1];
}