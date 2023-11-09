import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import pageRouter from "../router/pageRouter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FavouritePageActions } from "../store/fafouritePage/slice/FavouritePageSlice";

const Layout = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FavouritePageActions.loadInfoFavourites());
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                {pageRouter.map((page, key) => (
                    <Route key={key} path={page.url} element={page.element} />
                ))}
            </Routes>
        </>
    )
}

export default Layout;
