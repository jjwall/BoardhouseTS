import { BaseState } from "./basestate";
import { Texture, Font } from "three";

export interface RegistryKeyToSystemMap {
    [key: string]: (ents: ReadonlyArray<Object>, state: BaseState) => void;
}

export interface RegistryKeyToEntityListMap {
    [key: string]: Array<Object>;
}

export interface UrlToTextureMap {
    [url: string]: Texture;
}

export interface UrlToFontMap {
    [url: string]: Font;
}

export interface UrlToAudioMap {
    [url: string]: HTMLAudioElement;
}