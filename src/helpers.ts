import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    NearestFilter,
} from "three";
import { 
    AnimationComponent,
    HurtBoxComponent,
    HitBoxComponent,
} from "./corecomponents";
import { Resources } from "./resourcemanager";
import { SequenceTypes } from "./enums";

/**
 * Helper method to add a sprite to the stage.
 * @param url Path to texture file.
 * @param scene THREE.Scene.
 * @param pixelRatio Number of pixels to scale texture's height and width by.
 */
export function setSprite(url: string, scene: Scene, pixelRatio: number) : Mesh {
    // get texture from cached resources
    let spriteMap = Resources.instance.getTexture(url);
    // load geometry (consider caching these as well)
    var geometry = new PlaneGeometry(spriteMap.image.width*pixelRatio, spriteMap.image.height*pixelRatio);
    // set magFilter to nearest for crisp looking pixels
    spriteMap.magFilter = NearestFilter;
    var material = new MeshBasicMaterial( { map: spriteMap, transparent: true });
    var sprite = new Mesh(geometry, material);
    scene.add(sprite);

    return sprite;
}

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
 * @param entHurtBox
 */
export function setHurtBoxGraphic(entMesh: Mesh, entHurtBox: HurtBoxComponent) : void {
    const hurtBoxGeometry = new PlaneGeometry(entHurtBox.width, entHurtBox.height);
    const hurtBoxMaterial = new MeshBasicMaterial({ color: "#DC143C" });
    const hurtBoxMesh = new Mesh(hurtBoxGeometry, hurtBoxMaterial);
    entMesh.add(hurtBoxMesh);
}

/**
 * Helper to set visuals for a hitBox.
 * Used for testing hit collision assumptions.
 * @param entMesh
 * @param entHurtBox
 */
export function setHitBoxGraphic(entMesh: Mesh, entHitBox: HitBoxComponent) : void {
    const hitBoxGeometry = new PlaneGeometry(entHitBox.width, entHitBox.height);
    const hitBoxMaterial = new MeshBasicMaterial({ color: "#860111" });
    const hitBoxMesh = new Mesh(hitBoxGeometry, hitBoxMaterial);
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

/**
 * kittykatattack is the author of this scaling function.
 * Source can be found here:
 * https://github.com/kittykatattack/scaleToWindow
 * @param canvas HTMLCanvasElement
 */
export function scaleToWindow(canvas: HTMLCanvasElement): number {
    var scaleX: number;
    var scaleY: number;
    var scale: number;
    var center: string;

    //1. Scale the canvas to the correct size
    //Figure out the scale amount on each axis
    scaleX = window.innerWidth / canvas.offsetWidth;
    scaleY = window.innerHeight / canvas.offsetHeight;

    //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
    scale = Math.min(scaleX, scaleY);
    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = "scale(" + scale + ")";

    //2. Center the canvas.
    //Decide whether to center the canvas vertically or horizontally.
    //Wide canvases should be centered vertically, and 
    //square or tall canvases should be centered horizontally
    if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) {
            center = "horizontally";
        } else {
            center = "vertically";
        }
    } else {
        if (canvas.offsetHeight * scale < window.innerHeight) {
            center = "vertically";
        } else {
            center = "horizontally";
        }
    }

    //Center horizontally (for square or tall canvases)
    var margin;
    if (center === "horizontally") {
        margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
        canvas.style.marginTop = 0 + "px";
        canvas.style.marginBottom = 0 + "px";
        canvas.style.marginLeft = margin + "px";
        canvas.style.marginRight = margin + "px";
    }

    //Center vertically (for wide canvases) 
    if (center === "vertically") {
        margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
        canvas.style.marginTop = margin + "px";
        canvas.style.marginBottom = margin + "px";
        canvas.style.marginLeft = 0 + "px";
        canvas.style.marginRight = 0 + "px";
    }

    //3. Remove any padding from the canvas  and body and set the canvas
    //display style to "block"
    canvas.style.paddingLeft = 0 + "px";
    canvas.style.paddingRight = 0 + "px";
    canvas.style.paddingTop = 0 + "px";
    canvas.style.paddingBottom = 0 + "px";
    canvas.style.display = "block";

    //4. Set the color of the HTML body background
    document.body.style.backgroundColor = "black";

    //Fix some quirkiness in scaling for Safari
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
            // Chrome
        } else {
            // Safari
            //canvas.style.maxHeight = "100%";
            //canvas.style.minHeight = "100%";
        }
    }

    //5. Return the `scale` value. This is important, because you'll nee this value 
    //for correct hit testing between the pointer and sprites
    return scale;
}