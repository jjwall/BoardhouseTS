/**
 * Texture component. Contingent on changing based on
 * PixiJS implementation details.
 * Consider making class to ensure height / width aren't negative
 */
export interface TextureComponent {
    /**
     * Can be null i.e. invisible texture.
     */
    image: HTMLImageElement;
    height: number;
    width: number;
}