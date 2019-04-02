import { Mesh, Scene } from "THREE";

export class Widget extends Mesh {
    private _type: string;
    private _parent: Widget;
    private _children: Widget[] = [];
    private _attributes: AttrKeyToAttrValueMap = {};
    private _events: EventKeyToEventMap = {};
    public image: Mesh;
    public text: Mesh;
    constructor(type: string) {
        super();
        this._type = type;
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
        return this._children[this._children.length - 1];
    }
    public appendChild(child: Widget, scene: Scene): void {
        scene.add(child);
        child._parent = this;
        if (this.attr("z_index")) {
            child.setAttr("z_index", this.attr("z_index"));
        }
        this._children.push(child);
    }
    public removeChild(child: Widget): void {
        if (this._children.indexOf(child) !== -1) {
            this._children.splice(this._children.indexOf(child), 1);
        }
    }
    public replaceChild(newChild: Widget, childToReplace: Widget): void {
        const index = this._children.indexOf(childToReplace);

        if (childToReplace.text)
            newChild.text = childToReplace.text;

        if (childToReplace.image)
            newChild.image = childToReplace.image;

        this._children[index] = newChild;
    }
    public setAttr(name: string, value: string): void {
        this._attributes[name] = value;
    }
    public attr(name: string): string {
        return this._attributes[name];
    }
    public setEventListener(eventType: string, event: () => void): void {
        this._events[eventType] = event;
    }
    public trigger(name: string): void {
        if (this._events[name])
            this._events[name]();
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

interface AttrKeyToAttrValueMap {
    [key: string]: string;
}

interface EventKeyToEventMap {
    [key: string]: () => void;
}