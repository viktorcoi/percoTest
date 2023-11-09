import { createSlice } from "@reduxjs/toolkit";
import { getPeoples } from "../../../api/homePage/asyncThunks/getPeoples";

export interface HomePageScheme {
    isLoad: boolean;
    countPeoples: number;
}

const initialState: HomePageScheme = {
    isLoad: true,
    countPeoples: 0,
};

export const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setCountPeoples: (state, action) => {
            state.countPeoples = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPeoples.pending, (state) => {
            state.isLoad = true;
        })
        .addCase(getPeoples.fulfilled, (state) => {
            state.isLoad = false;
        })
        .addCase(getPeoples.rejected, (state) => {
            state.isLoad = false;
        })
    }
})
  
export const { actions: HomePageActions } = HomePageSlice;
export const { reducer: HomePageReducer } = HomePageSlice;