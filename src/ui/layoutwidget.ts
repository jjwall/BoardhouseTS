import { Mesh, MeshBasicMaterial, PlaneGeometry, NearestFilter, ShapeBufferGeometry, FontLoader } from "three";
import { Resources } from "./../resourcemanager";
import { Widget } from "./widget";
/**
 * Layout widget by updating Mesh properties for any relevant attribute.
 * Gets called when Widget is create or setState is called.
 * @param widget 
 */
export function layoutWidget(widget: Widget): void {
    // Update plane geometry with height and width attributes.
    if (widget.attr("height") && widget.attr("width")) {
        widget.geometry = new PlaneGeometry(Number(widget.attr("width")), Number(widget.attr("height")));
    }

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

    if (widget.getType() === "panel") {
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
                widget.add(img);
            }
            // Otherwise, set widget's geometry and material to img mesh.
            else {
                widget.geometry = new PlaneGeometry(imgMap.image.width*scaleFactor, imgMap.image.height*scaleFactor);
                widget.material = new MeshBasicMaterial( { map: imgMap, transparent: true });
            }
        }
    }

    if (widget.getType() === "label" && widget.attr("nodeValue")) {
        let color: string;
        let font: string;
        let font_size: number;
        
        // Default color is black if not specified.
        if (!widget.attr("color"))
            color = "#000000";
        else
            color = widget.attr("color");

        // Default font is helvetiker if not specified.
        if (!widget.attr("font"))
            font = "../../data/fonts/helvetiker_regular_typeface.json";
        else
            font = widget.attr("font");
        
        // Default font size is 16 if not specified.
        if (!widget.attr("font_size"))
            font_size = 16;
        else
            font_size = Number(widget.attr("font_size"));

        let loader = new FontLoader();
        loader.load(font, function(font) {
            var matLite = new MeshBasicMaterial( {
                color: color,
                transparent: true,
            });

            const shapes = font.generateShapes(widget.attr("nodeValue"), font_size, 0);
            const geometry = new ShapeBufferGeometry(shapes);
            geometry.computeBoundingBox();
            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            geometry.translate(xMid, 0, 0);
            const text = new Mesh(geometry, matLite);
            widget.add(text);
        });
    }
}