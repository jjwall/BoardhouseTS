import { Object3D, Mesh } from "THREE";

export class Widget extends Mesh {
    private _type: string;
    private _parent: Widget;
    private _children: Widget[] = [];
    private _attributes: AttrKeyToAttrValueMap = {};
    constructor(type: string) {
        super();
        this._type = type;
    }
    public getParent(): Widget {
        return this._parent;
    }
    public appendChild(child: Widget): void {
        this._children.push(child);
    }
    public removeChild(child: Widget): void {
        if (this._children.indexOf(child) !== -1) {
            this._children.splice(this._children.indexOf(child), 1);
        }
    }
    public setAttr(name: string, value: string): void {
        this._attributes[name] = value;
    }
    public attr(name: string): string {
        return this._attributes[name];
    }
}

interface AttrKeyToAttrValueMap {
    [key: string]: string;
}