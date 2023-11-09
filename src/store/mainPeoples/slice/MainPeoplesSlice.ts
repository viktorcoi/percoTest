import { createSlice } from "@reduxjs/toolkit";
import { getPeoples } from "../../../api/MainPeoples/asyncThunks/getPeoples";

export interface MainPeopleScheme {
    id: number;
    name: string;
    height: string;
    mass: string;
    color: string;
    favourite: number;
}

export interface MainPeoplesScheme {
    isLoad: boolean;
    nextPage: number;
    prevPage: number;
    peoples: MainPeopleScheme[];
    selected: number[];
}

const initialState: MainPeoplesScheme = {
    isLoad: true,
    nextPage: 0,
    prevPage: 0,
    peoples: [   
        {   
            id: 0,
            name: '',
            height: '',
            mass: '',
            color: '',
            favourite: 0,
        }
    ],
    selected: []
};

export const MainPeoplesSlice = createSlice({
    name: 'mainPeoples',
    initialState,
    reducers: {
        setPeoples: (state, action) => {
            state.peoples = [...action.payload];
        },
        setSelected: (state, action) => {
            if (state.selected.find((id) => id === action.payload)) {
                state.selected = state.selected.filter((id) => id !== action.payload)
            } else {
                state.selected.push(action.payload);
            }
        },
        clearSelected: (state) => {
            state.selected = [];
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload;
        },
        
        setPrevPage: (state, action) => {
            state.prevPage = action.payload;
        },
        setFavourite: (state, action) => {
            const personIndex = state.peoples.findIndex(person => person.id === action.payload);
            if (personIndex !== -1) {
                if (state.peoples[personIndex].favourite === 0) state.peoples[personIndex].favourite = 1;
                else state.peoples[personIndex].favourite = 0;
            }
        },
        setFavouriteArr: (state) => {
            state.selected.forEach((item) => {
                const personIndex = state.peoples.findIndex(person => person.id === item);
                if (personIndex !== -1) {
                    state.peoples[personIndex].favourite = 1;
                }
            })
        },
        removeFavouriteArr: (state) => {
            state.selected.forEach((item) => {
                const personIndex = state.peoples.findIndex(person => person.id === item);
                if (personIndex !== -1) {
                    state.peoples[personIndex].favourite = 0;
                }
            })
        },
        setFavouriteAll: (state) => {
            const newData = state.peoples.map((item) => ({
                ...item,
                favourite: 1,
            }))
            state.peoples = [...newData];
        },
        removeFavouriteAll: (state) => {
            const newData = state.peoples.map((item) => ({
                ...item,
                favourite: 0,
            }))
            state.peoples = [...newData];
        }
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
  
export const { actions: MainPeoplesActions } = MainPeoplesSlice;
export const { reducer: MainPeoplesReducer } = MainPeoplesSlice;