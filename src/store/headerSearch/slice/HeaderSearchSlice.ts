import { createSlice } from "@reduxjs/toolkit";
import { searchPeoples } from "../../../api/headerSearch/asyncThunks/searchPeoples";

export interface HeaderSearchScheme {
    countPeoples: number;
    listSearch: {
        id: number,
        name: string;
    }[]
}

const initialState: HeaderSearchScheme = {
    countPeoples: 0,
    listSearch: [
        {
            id: 0,
            name: ''
        }
    ],
};

export const HeaderSearchSlice = createSlice({
    name: 'headerSearch',
    initialState,
    reducers: {
        setListSearch: (state, action) => {
            state.listSearch = [...action.payload];
        },
        setCountPeolpe: (state, action) => {
            state.countPeoples = action.payload;
        }
    },
})
  
export const { actions: HeaderSearchActions } = HeaderSearchSlice;
export const { reducer: HeaderSearchReducer } = HeaderSearchSlice;