import Favourites from "../pages/Favourites/Favourites";
import HomePage from "../pages/HomePage/HomePage";
import MainPeoples from "../pages/MainPeoples/MainPeoples";

const pageRouter = [
    {
        element: <HomePage />,
        url: '/'
    },
    {
        element: <Favourites />,
        url: '/favourites'
    },
    {
        element: <MainPeoples />,
        url: '/peoples'
    }
]

export default pageRouter;