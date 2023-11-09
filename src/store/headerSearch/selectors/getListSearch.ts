import { createSelector } from "@reduxjs/toolkit";
import { HeaderSearchScheme } from "../slice/HeaderSearchSlice";

type HeaderSearchState = {
    headerSearch: HeaderSearchScheme;
};

const listSearch = (state: HeaderSearchState) => state?.headerSearch?.listSearch || [];

export const getListSearch = createSelector(
    [listSearch], (listSearch) => listSearch
)