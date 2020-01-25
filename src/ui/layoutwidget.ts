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
    if (widget.attr("position")) {
        if (widget.attr("position") === "relative") {
            if (widget.getParent()) {
                widget.position.y = widget.getParent().position.y;
                widget.position.x = widget.getParent().position.x;
            }
        }
    }
    else { // default to "relative"
        if (widget.getParent()) {
            widget.position.y = widget.getParent().position.y;
                widget.position.x = widget.getParent().position.x;
        }
    }

    if (widget.attr("top")) {
        widget.position.y -= Number(widget.attr("top"));
    }

    if (widget.attr("left")) {
        widget.position.x += Number(widget.attr("left"));
    }

    if (widget.attr("z_index")) {
        widget.position.z = Number(widget.attr("z_index"));
    }
}

function layoutPanelAttributes(widget: Widget) {
    // Update plane geometry with height and width attributes.
    if (widget.attr("height") && widget.attr("width")) {
        widget.geometry = new PlaneGeometry(Number(widget.attr("width")), Number(widget.attr("height")));
    }

    // Update mesh's material with color attribute.
    if (widget.attr("color")) {
        widget.material = new MeshBasicMaterial({color: widget.attr("color")});
    }

    // Update mesh's material and geometry based on img attribute.
    if (widget.attr("img")) {
        // Get scaleFactor if exists.
        const scaleFactor: number = widget.attr("scale-factor") ? Number(widget.attr("scale-factor")) : 1;
        const hasColor: boolean = widget.attr("color") ? true : false;
        // Get texture from cached resources.
        let imgMap = Resources.instance.getTexture(widget.attr("img"));
        // Set magFilter to nearest for crisp looking pixels.
        imgMap.magFilter = NearestFilter;

        // If color attr exists, add img mesh to widget.
        if (hasColor) {
            const geometry = new PlaneGeometry(imgMap.image.width*scaleFactor, imgMap.image.height*scaleFactor);
            const material = new MeshBasicMaterial( { map: imgMap, transparent: true });
            const img = new Mesh(geometry, material);

            if (!widget.image)
                widget.add(img);

            widget.image = img;
        }
        // Otherwise, set widget's geometry and material to img mesh.
        else {
            widget.geometry = new PlaneGeometry(imgMap.image.width*scaleFactor, imgMap.image.height*scaleFactor);
            widget.material = new MeshBasicMaterial( { map: imgMap, transparent: true });
        }
    }
}

function layoutLabelAttributes(widget: Widget) {
    const color = widget.attr("color") || "#000000";
    const fontUrl = widget.attr("font") || "./data/fonts/helvetiker_regular_typeface.json";
    const font_size = Number(widget.attr("font_size") || 16);
    const contents = widget.attr("contents") || "";

    const generateGeometry = () => {
        const font = Resources.instance.getFont(fontUrl);
        const shapes = font.generateShapes(contents, font_size, 0);
        const geometry = new ShapeBufferGeometry(shapes);

        // Ensure font is centered on (parent) widget.
        geometry.computeBoundingBox();
        const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);

        return geometry;
    };

    if (!widget.text) {
        const geom = generateGeometry();

        const material = new MeshBasicMaterial({
            color: color,
            transparent: true,
        });

        const text = new Mesh(geom, material);

        widget.add(text);
        widget.text = text;
        widget.text_params = { contents, font_size };
    }
    else {
        if (contents !== widget.text_params.contents || font_size !== widget.text_params.font_size) {
            widget.text.geometry = generateGeometry();
        }

        (widget.text.material as MeshBasicMaterial).color.setStyle(color);
    }
}