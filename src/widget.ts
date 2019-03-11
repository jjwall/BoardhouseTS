import { Scene, Mesh, PlaneGeometry, MeshBasicMaterial } from "three";

export class Widget {
    type: string;
    props: Props;
    mesh: Mesh;
    setProps(props: Props) {
        this.props = props;

        if (!props.height)
            this.props.height = 0;
        if (!props.width)
            this.props.width = 0;
        if (!props.top)
            this.props.top = 0;
        if (!props.left)
            this.props.left = 0;
    }
    renderTo(scene: Scene) {
        if (!this.mesh) {
            const widgetGeometry = new PlaneGeometry(this.props.width, this.props.height);
            const widgetMaterial = new MeshBasicMaterial({ color: "#228B22" });
            const widgetMesh = new Mesh(widgetGeometry, widgetMaterial);
            scene.add(widgetMesh);
        }
        else {
            // update mesh based on props
        }
    }
}

export function createWidget(type: string, props: Props = {}, ...args: any[]) : Widget {
    let widget = new Widget();
    widget.type = type;

    if (args.length > 0) {
        props.children = [].concat(...args)
            .filter(c => c != null && c !== false)
            .map(c => c instanceof Widget ? c : createTextElement(c));
        
    }

    widget.setProps(props);

    return widget;
}

export function createTextElement(value: string) : Widget {
    return createWidget("TEXT_ELEMENT", { nodeValue: value });
}

interface Props {
    onClick?: (e: any) => void;
    onHover?: (e: any) => void;
    offHover?: (e: any) => void;
    children?: Widget[];
    nodeValue?: string;
    height?: number;
    width?: number;
    top?: number;
    left?: number;
}

export function ReconcileThreeDom(parentWidget: Widget, scene: Scene) {
    parentWidget.renderTo(scene);

    if (parentWidget.props.children && parentWidget.props.children.length > 0) {
        parentWidget.props.children.forEach(child => {
            reconcileChildren(child, scene);
        });
    }

    function reconcileChildren(widget: Widget, scene: Scene) {
        widget.renderTo(scene);
        if (widget.props.children !== undefined && widget.props.children.length > 0) {
            widget.props.children.forEach(child => {
                reconcileChildren(child, scene);
            });
        }
    }
}