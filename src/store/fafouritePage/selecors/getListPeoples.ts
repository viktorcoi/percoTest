import { createSelector } from "@reduxjs/toolkit";
import { FavouritePageScheme } from "../slice/FavouritePageSlice";

type FavouritePageState = {
    favourites: FavouritePageScheme;
};

const listPeoples = (state: FavouritePageState) => state?.favourites?.favourites || [];

export const getListPeoples = createSelector(
    [listPeoples], (listPeoples) => listPeoples
)