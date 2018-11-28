export namespace BoardhouseUI {
    class Component<Props, State> {
        state: Readonly<State>;
        props: Readonly<Props>;
        constructor(props: Props){
            this.props = props;
            this.state = this.state;
        };
        setState(newState: State) {
            this.state = newState;
            // Render(this);
        }
        componentDidMount(){};
        componentWillUnmount(){};
        render(){};
    }

    interface Element {
        type: WidgetTypes
        props: BaseProps;
    }

    interface BaseProps {
        // id: string;
        children: Element[]; 
    }

    interface Style {
        color: string;
        height: number;
        width: number;
        left: number;
        top: number;
        lineWidth: number;
        lineColor: number;
    }

    export class Widget {
        selfContainer: PIXI.Container;
        style: Style;
        type: WidgetTypes | Component<BaseProps, object>;
        attributes: {}[];
        children: Widget[];
        onClick: () => void;
        // text: string;
        constructor(widgetType: WidgetTypes | Component<BaseProps, object>) {
            this.type = widgetType;
            // set default attributes based on type;
            // if type label... this.attributes = 
            this.children = [];
            this.selfContainer = new PIXI.Container;
        }
        appendChild(child: Widget) {
            this.children.push(child);
        }
        addEventListener(eventType: string, event: () => void) {
            if (eventType === "click") {
                this.onClick = event;
            }
        }
        setAttributes(key: string, val: string){

        }
        renderTo(outerContainer: PIXI.Container) {
            // if type is sprite // if type is box?
            let rectangle = new PIXI.Graphics();
            rectangle.lineStyle(4, 0x000000, 1); // border value
            rectangle.beginFill(0x66CCFF); // border color
            rectangle.drawRect(0, 0, 64, 64); // height width
            rectangle.endFill();
            // rectangle.x = 170; // left value
            // rectangle.y = 170; // top value
            // container.x = 170;
            // container.y = 170;
            outerContainer.addChild(this.selfContainer);
            this.selfContainer.position.set(170, 170);
            this.selfContainer.addChild(rectangle)
            // container.addChild(rectangle);
        }
    }

    export enum WidgetTypes {
        Div,
        Button,
    }

    function CreateWidget(elementType: WidgetTypes) : Widget {
        return new Widget(elementType);
    }

    function Render(element: Element, parentWidget: Widget) : void {
        const type: WidgetTypes = element.type;
        const props: BaseProps = element.props;

        // Create Widget.
        const widget: Widget = CreateWidget(type);

        Object.keys(props).forEach(propName => {
            // Add event listeners.
            if (propName.substring(0,2) === "on") {
                const eventType = propName.toLowerCase().substring(2);
                widget.addEventListener(eventType, props[propName]);
            }
            // Set properties.
            if (propName !== "children") {
                widget.attributes.push({propName: props[propName]})
            }
        });

        // Render children
        const childElements: Element[] = props.children || [];
        childElements.forEach(childElement => Render(childElement, widget));
        
        // Append to parent.
        parentWidget.appendChild(widget);
    }

    // function Instantiate(element: Element, parentWidget) {
    //     const type = element.type;
    //     const props = element.props;
    //     const childElements = props.children || [];
    // }

    // PIXI DOM Implementation details:

    export function ReconcilePixiDom(parentWidget: Widget, stage: PIXI.Container) {
        if (parentWidget.children !== undefined && parentWidget.children.length > 0) {
            parentWidget.children.forEach(child => {
                reconcileChildren(child, parentWidget.selfContainer);
            });
        }

        function reconcileChildren(widget: Widget, container: PIXI.Container) {
            widget.renderTo(container);
            if (widget.children !== undefined && widget.children.length > 0) {
                widget.children.forEach(child => {
                    reconcileChildren(child, widget.selfContainer);
                });
            }
        }

        parentWidget.renderTo(stage);
    }
}