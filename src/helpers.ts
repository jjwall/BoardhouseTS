/**
 * Helper method to add a sprite to the stage.
 * @param texturePath Path to texture file. Starts at project root.
 * @param xPos Starting x position.
 * @param yPos Starting y position.
 * @param stage PIXI.Container i.e. the stage.
 * @param pixelRatio Number of pixels to scale texture's height and width by.
 */
export function setSprite(texturePath: string, xPos: number, yPos: number, stage: PIXI.Container, pixelRatio: number) : PIXI.Sprite {
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources[texturePath].texture
    );
    // set scale mode
    sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    sprite.x = xPos;
    sprite.y = yPos;
    sprite.width *= pixelRatio;
    sprite.height *= pixelRatio;
    stage.addChild(sprite);

    return sprite;
}

/**
 * Helper to set visuals for a hitBox.
 * @param stage 
 * @param width 
 * @param height 
 */
export function setHitBoxGraphic(stage: PIXI.Container, width: number, height: number) : PIXI.Graphics {
        let hitBoxGraphic = new PIXI.Graphics();
        hitBoxGraphic.lineStyle(1, 0x008000, 1);
        hitBoxGraphic.drawRect(0, 0, width, height);
        stage.addChild(hitBoxGraphic);

        return hitBoxGraphic;
}

/**
 * Helper to set visuals for a hurtBox.
 * @param stage 
 * @param width 
 * @param height 
 */
export function setHurtBoxGraphic(stage: PIXI.Container, width: number, height: number) : PIXI.Graphics {
        let hurtBoxGraphic = new PIXI.Graphics();
        hurtBoxGraphic.lineStyle(1, 0x860111, 1);
        hurtBoxGraphic.drawRect(0, 0, width, height);
        stage.addChild(hurtBoxGraphic);

        return hurtBoxGraphic;
}

/**
 * Clears all rendered elements from container and it's children.
 * @param baseContainer 
 */
export function clearStage(baseContainer: PIXI.Container) {
    baseContainer.destroy({children:true, texture:true, baseTexture:true});

}

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