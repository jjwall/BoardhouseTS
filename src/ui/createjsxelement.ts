import { JSXElement } from "./interfaces";

export function createJSXElement(type: string, config: object, ...args: JSXElement[]): JSXElement {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const children = hasChildren ? [].concat(...args) : [];

    return { type, props, children };
}