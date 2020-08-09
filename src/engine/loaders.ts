import { UrlToTextureMap, UrlToFontMap, UrlToAudioMap } from "./interfaces";
import { Texture, TextureLoader, Font, FontLoader } from "three";

export async function loadTextures(urls: string[]) : Promise<UrlToTextureMap> {
    const loader = new TextureLoader();

    const promises = urls.map((url) =>
        new Promise<Texture>((resolve) => {
            loader.load(url, (tex) => resolve(tex));
        })
    );

    const textures = await Promise.all(promises);

    const cachedTextures: UrlToTextureMap = {};

    textures.forEach((tex, i) => {
        cachedTextures[urls[i]] = tex;
    });

    return cachedTextures;
}

export async function loadFonts(urls: string[]) : Promise<UrlToFontMap> {
    const loader = new FontLoader();

    const promises = urls.map((url) =>
        new Promise<Font>((resolve) => {
            loader.load(url, (font) => resolve(font));
        })
    );

    const fonts = await Promise.all(promises);

    const cachedFonts: UrlToFontMap = {};

    fonts.forEach((font, i) => {
        cachedFonts[urls[i]] = font;
    });

    return cachedFonts;
}

export async function loadAudioElements(urls: string[]) : Promise<UrlToAudioMap> {
    const promises = urls.map((url) =>
        new Promise<HTMLAudioElement>((resolve) => {
            const audioElement = new Audio(url);

            audioElement.oncanplaythrough = () => {
                return resolve(audioElement);
            }
        })
    );

    const audioElements = await Promise.all(promises);

    const cachedAudioElements: UrlToAudioMap = {};

    audioElements.forEach((audio, i) => {
        cachedAudioElements[urls[i]] = audio;
    });

    return cachedAudioElements;
}