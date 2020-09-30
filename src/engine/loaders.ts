import { UrlToTextureMap, UrlToFontMap, UrlToAudioBufferMap } from "./interfaces";
import { Texture, TextureLoader, Font, FontLoader, AudioLoader } from "three";

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

export async function loadAudioBuffers(urls: string[]) : Promise<UrlToAudioBufferMap> {
    const loader = new AudioLoader();
    let promises: Promise<AudioBuffer>[] = [];

    urls.forEach(url => {
        promises.push(new Promise<AudioBuffer>((resolve) => {
            loader.load(url, (audBuf) => resolve(audBuf))
        }));
    });

    const audioBuffers = await Promise.all(promises);

    const cachedAudioBuffers: UrlToAudioBufferMap = {};

    audioBuffers.forEach((audio, i) => {
        cachedAudioBuffers[urls[i]] = audio;
    });

    return cachedAudioBuffers;
}