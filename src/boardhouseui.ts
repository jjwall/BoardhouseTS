namespace BoardHouseUI {
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
        id: string;
        children: Element[]; 
    }

    interface Dictionary {
        key: string;
        value: string;
    }

    class Widget {
        type: WidgetTypes | Component<BaseProps, object>;
        attributes: Dictionary[];
        children: Widget[];
        // text: string;
        constructor(widgeType: WidgetTypes | Component<BaseProps, object>) {
            this.type = widgeType;
            // set default attributes based on type;
            // if type label... this.attributes = 
            this.children = [];
        }
        appendChild(child: Widget) {
            this.children.push(child);
        }
    }

    enum WidgetTypes {
        Div,
        Button,
    }

    function CreateWidget(elementType: WidgetTypes) : Widget {
        return new Widget(elementType);
    }

    function Render(element: Element, parentWidget: Widget) {
        const type: WidgetTypes = element.type;
        const props: BaseProps = element.props;
        const childElements: Element[] = props.children || [];
        const widget: Widget = CreateWidget(type);
        childElements.forEach(childElement => Render(childElement, widget));
        parentWidget.appendChild(widget);
    }

    // function Instantiate(element: Element, parentWidget) {
    //     const type = element.type;
    //     const props = element.props;
    //     const childElements = props.children || [];
    // }
}