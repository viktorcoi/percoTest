import { createSlice } from "@reduxjs/toolkit";
import { getPeople } from "../../../api/peoplePage/asyncThunks/getPeople";

export interface PeopleInfoScheme {
    id: number,
    name: string;
    height: string;
    mass: string;
    color: string;
    favourite: number;
}

export interface PeopleScheme {
    isLoad: boolean;
    infoPeople: PeopleInfoScheme;
}

const initialState: PeopleScheme = {
    isLoad: true,
    infoPeople: {
        id: 0,
        name: '',
        height: '',
        mass: '',
        color: '',
        favourite: 0,
    },
};

export const PeopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        setPeople: (state, action) => {
            state.infoPeople = {...action.payload}
        },
        setFavourite: (state) => {
            state.infoPeople.favourite = 1; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPeople.pending, (state) => {
            state.isLoad = true;
        })
        .addCase(getPeople.fulfilled, (state) => {
            state.isLoad = false;
        })
        .addCase(getPeople.rejected, (state) => {
            state.isLoad = false;
        })
    }
})
  
export const { actions: PeopleActions } = PeopleSlice;
export const { reducer: PeopleReducer } = PeopleSlice;