import { createSelector } from "@reduxjs/toolkit";
import { FavouritePageScheme } from "../slice/FavouritePageSlice";

type FavouritePageState = {
    favourites: FavouritePageScheme;
};

const listSelected = (state: FavouritePageState) => state?.favourites?.selected || [];

export const getListSelected = createSelector(
    [listSelected], (listSelected) => listSelected
)