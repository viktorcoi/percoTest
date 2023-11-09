import { createSelector } from "@reduxjs/toolkit";
import { MainPeoplesScheme } from "../slice/MainPeoplesSlice";

type MainPeoplesState = {
    mainPeoples: MainPeoplesScheme;
};

const listPeoples = (state: MainPeoplesState) => state?.mainPeoples?.peoples || [];

export const getListPeoples = createSelector(
    [listPeoples], (listPeoples) => listPeoples
)