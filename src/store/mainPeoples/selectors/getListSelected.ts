import { createSelector } from "@reduxjs/toolkit";
import { MainPeoplesScheme } from "../slice/MainPeoplesSlice";

type MainPeoplesState = {
    mainPeoples: MainPeoplesScheme;
};

const listSelected = (state: MainPeoplesState) => state?.mainPeoples?.selected || [];

export const getListSelected = createSelector(
    [listSelected], (listSelected) => listSelected
)