export interface routeChildrenType {
    title: string;
    path: string;
    element: JSX.Element;
}

export interface routerType {
    title: string;
    path: string;
    element?: JSX.Element;
    children?: Array<routeChildrenType>;
}