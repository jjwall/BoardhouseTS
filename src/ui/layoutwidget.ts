import { Mesh, MeshBasicMaterial, PlaneGeometry, NearestFilter, ShapeBufferGeometry } from "three";
import { Resources } from "./../resourcemanager";
import { Widget } from "./widget";
/**
 * Layout widget by updating Mesh properties for any relevant attribute.
 * Gets called when Widget is create or setState is called.
 * @param widget
 */
export function layoutWidget(widget: Widget): void {
    layoutCommonAttributes(widget);

    if (widget.getType() === "panel") {
        layoutPanelAttributes(widget);
    }

    if (widget.getType() === "label" && widget.attr("contents")) {
        layoutLabelAttributes(widget);
    }

    widget.childNodes.forEach(child => {
        layoutWidget(child);
    })
}

function layoutCommonAttributes(widget: Widget) {
    widget.position.y = -Number(widget.attr("top") || 0);
    widget.position.x = Number(widget.attr("left") || 0);
    widget.position.z = Number(widget.attr("z_index") || 0);
}

function layoutPanelAttributes(widget: Widget) {
    // Update plane geometry with height and width attributes.
    const width = Number(widget.attr("width") || 0);
    const height = Number(widget.attr("height") || 0);

    if (widget.geometry && widget.geometry instanceof PlaneGeometry) {
        const { width: prevWidth, height: prevHeight } = (widget.geometry as PlaneGeometry).parameters;

        if (width !== prevWidth || height !== prevHeight) {
            widget.geometry = new PlaneGeometry(width, height);
        }
    } else {
        widget.geometry = new PlaneGeometry(width, height);
    }

    // Update mesh's material with color attribute.
    const color = widget.attr("color");

    if (color) {
        (widget.material as MeshBasicMaterial).transparent = false;
        (widget.material as MeshBasicMaterial).color.setStyle(color);
    } else {
        (widget.material as MeshBasicMaterial).transparent = true;
        (widget.material as MeshBasicMaterial).opacity = 0;
    }

    // Update mesh's material and geometry based on img attribute.
    if (widget.attr("img")) {
        // Get scaleFactor if exists.
        const scaleFactor = Number(widget.attr("scale-factor") || 1);

        // Get texture from cached resources.
        const imgMap = Resources.instance.getTexture(widget.attr("img"));

        const width = imgMap.image.width * scaleFactor;
        const height = imgMap.image.height * scaleFactor;

        if (!widget.image) {
            // Set magFilter to nearest for crisp looking pixels.
            imgMap.magFilter = NearestFilter;

            const geometry = new PlaneGeometry(width, height);
            const material = new MeshBasicMaterial({ map: imgMap, transparent: true });
            const img = new Mesh(geometry, material);

            widget.setImage(img);
        } else {
            const { width: prevWidth, height: prevHeight } = (widget.image.geometry as PlaneGeometry).parameters;
            const material = widget.image.material as MeshBasicMaterial;

            if (material.map !== imgMap) {
                material.map = imgMap;
            }

            if (width !== prevWidth || height !== prevHeight) {
                widget.image.geometry = new PlaneGeometry(width, height);
            }
        }
    } else {
        widget.clearImage();
    }
}

function layoutLabelAttributes(widget: Widget) {
    const color = widget.attr("color") || "#000000";
    const fontUrl = widget.attr("font") || "./data/fonts/helvetiker_regular_typeface.json";
    const font_size = Number(widget.attr("font_size") || 16);
    const contents = widget.attr("contents") || "";

    if (!widget.text) {
        const geom = Resources.instance.getTextGeometry(contents, fontUrl, font_size);

        const material = new MeshBasicMaterial({
            color: color,
            transparent: true,
        });

        const text = new Mesh(geom, material);

        widget.setImage(text);
        widget.text = text;
        widget.text_params = { contents, fontUrl, font_size };
    }
    else {
        if (contents !== widget.text_params.contents || fontUrl !== widget.text_params.fontUrl || font_size !== widget.text_params.font_size) {
            widget.text.geometry = Resources.instance.getTextGeometry(contents, fontUrl, font_size);
            widget.text_params = { contents, fontUrl, font_size };
        }

        (widget.text.material as MeshBasicMaterial).color.setStyle(color);
    }
}