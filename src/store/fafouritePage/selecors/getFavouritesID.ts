import { createSelector } from "@reduxjs/toolkit";
import { FavouritePageScheme } from "../slice/FavouritePageSlice";

type FavouritePageState = {
    favourites: FavouritePageScheme;
};

const favouritesID = (state: FavouritePageState) => state?.favourites?.favouritesID || [];

export const getFavouritesID = createSelector(
    [favouritesID], (favouritesID) => favouritesID
)