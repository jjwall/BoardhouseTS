import { Object3D } from "THREE";

export class Widget extends Object3D {
    private _type: string;
    private _parent: Widget;
    private _children: Widget[];
    private _attributes: AttrKeyToAttrValueMap;
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
    public setAttr(attrKey: string, attrVal): void {
        this._attributes[attrKey] = attrVal;
    }
    public getAttrs(): AttrKeyToAttrValueMap {
        return this._attributes;
    }
}

interface AttrKeyToAttrValueMap {
    [key: string]: string;
}