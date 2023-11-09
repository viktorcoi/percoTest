import Favourites from "../pages/Favourites/Favourites";
import HomePage from "../pages/HomePage/HomePage";
import MainPeoples from "../pages/MainPeoples/MainPeoples";
import People from "../pages/People/People";

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
    },
    {
        element: <People />,
        url: '/peoples/:id'
    }
]

export default pageRouter;