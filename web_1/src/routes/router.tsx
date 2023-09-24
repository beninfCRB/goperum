import { Route, Routes, useLocation } from "react-router-dom";
import Pages from "./pages";
import { routeChildrenType, routerType } from ".";
import TopBarProgress from "react-topbar-progress-indicator";
import { useEffect, useState } from "react";

const Router = () => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if (location.pathname === prevLoc) {
            setPrevLoc('')
        }
    }, [location])

    useEffect(() => {
        setProgress(false)
    }, [prevLoc])

    const pageRoutes = Pages.map(({ path, title, element, children }: routerType) => {
        return (
            <Route key={title} path={`${path}`} element={element} >
                {children?.map((value: routeChildrenType) => (
                    <Route key={value?.title} path={`${value?.path}`} element={value?.element} />
                )
                )}
            </Route>
        );
    });

    return (
        <>
            {progress && <TopBarProgress />}
            <Routes>{pageRoutes}</Routes>;
        </>
    )
};

export default Router;