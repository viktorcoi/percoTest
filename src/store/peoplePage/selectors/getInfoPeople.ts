import { createSelector } from "@reduxjs/toolkit";
import { PeopleScheme } from "../slice/PeopleSlice";

type PeopleState = {
    people: PeopleScheme;
};

const infoPeople = (state: PeopleState) => state?.people?.infoPeople || {};

export const getInfoPeople = createSelector(
    [infoPeople], (infoPeople) => infoPeople
)