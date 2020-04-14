import { Resources } from "./resourcemanager";

/**
 * Helper for audio, hitbox and hurtbox graphics
 */

/**
 * Helper method to play audio.
 * @param url Path to audio file.
 * @param volume Optional param to set the volume. Must be >= 0 && <= 1.
 * @param loop Optional param to determine if the audio should loop.
 * @param clone Optional param to determine if multiple instances of the audio file can play at the same time.
 */
export function playAudio(url: string, volume?: number, loop?: boolean, clone?: boolean) : void {
    let audio = clone ?
        Resources.instance.getAudioElement(url).cloneNode(true) as HTMLAudioElement :
        Resources.instance.getAudioElement(url);

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