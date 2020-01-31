import { Mesh, Scene, Group, Object3D, Matrix4 } from "three";

interface AttrKeyToAttrValueMap {
    [key: string]: string;
}

interface EventKeyToEventMap {
    [key: string]: (e?: Event) => void;
}

export class Widget extends Mesh {
    private _type: string;
    private _parent: Widget;
    private _attributes: AttrKeyToAttrValueMap = {};
    private _events: EventKeyToEventMap = {};
    private _children: Widget[] = [];
    private _widgetChildren: Group = new Group();
    private _imageChildren: Group = new Group();
    public image: Mesh;
    public text: Mesh;
    public text_params: { contents: string, fontUrl: string, font_size: number };
    constructor(type: string) {
        super();
        this._type = type;
        this.add(this._widgetChildren);
        this.add(this._imageChildren);
    }
    public getType(): string {
        return this._type;
    }
    public getParent(): Widget {
        return this._parent;
    }
    public get childNodes(): Widget[] {
        return this._children;
    }
    public get lastChild(): Widget {
        return this.childNodes[this.childNodes.length - 1];
    }
    public setImage(img: Mesh): void {
        this.clearImage();
        this._imageChildren.add(img);
        this.image = img;
    }
    public clearImage(): void {
        if (this.image) {
            this._imageChildren.remove(this.image);
            this.image = null;
        }
    }
    public appendChild(child: Widget): void {
        this._widgetChildren.add(child);
        this._children.push(child);
        child._parent = this;
        if (this.attr("z_index")) {
            child.setAttr("z_index", this.attr("z_index"));
        }
    }
    public removeChild(child: Widget): void {
        this._widgetChildren.remove(child);
        this._children.splice(this._children.indexOf(child), 1);
        child.parent = null;
    }
    public replaceChild(newChild: Widget, childToReplace: Widget): void {
        const index = this._children.indexOf(childToReplace);

        this._widgetChildren.remove(childToReplace);
        this._widgetChildren.add(newChild);

        this._children[index] = newChild;
        childToReplace.parent = null;
    }
    public setAttr(name: string, value: string): void {
        this._attributes[name] = value;
    }
    public attr(name: string): string {
        return this._attributes[name];
    }
    public event(name: string): (e?: Event) => void {
        return this._events[name];
    }
    public setEventListener(eventType: string, event: () => void): void {
        this._events[eventType] = event;
    }
    public detachEventListener(eventType: string): void {
        this._events[eventType] = undefined;
    }
    public trigger(name: string, event?: Event): void {
        if (this._events[name]) {
            if (event) {
                this._events[name](event);
            }
            else {
                this._events[name]();
            }
        }
    }
}

/**
 * Returns new Widget and add it's mesh to the scene.
 * @param type
 * @param scene
 */
export function createWidget(type: string): Widget {
    let widget = new Widget(type);
    return widget;
}