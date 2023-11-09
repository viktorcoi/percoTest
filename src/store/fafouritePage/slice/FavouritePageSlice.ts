import { createSlice } from "@reduxjs/toolkit";
import { MainPeopleScheme } from "../../mainPeoples/slice/MainPeoplesSlice";

export interface FavouritePageScheme {
    isLoad: boolean; 
    favourites: MainPeopleScheme[];
    countFavourites: number;
    favouritesID: number[];
    selected: number[];
}

const initialState: FavouritePageScheme = {
    isLoad: false,
    favourites: [
        {
            id: 0,
            name: '',
            height: '',
            mass: '',
            color: '',
            favourite: 0,
        }
    ],
    countFavourites: 0,
    favouritesID: [],
    selected: []
};

export const FavouritePageSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
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
        setFavourites: (state, action) => {
            const savedStorage = localStorage.getItem('favourites');
            const savedData = savedStorage ? JSON.parse(savedStorage) : null;
            if (!action.payload.favourite) {
                if (savedData) {
                    const newData = [
                        ...savedData,
                        {
                            ...action.payload,
                            favourite: 1,
                        }
                    ]
                    localStorage.setItem('favourites', JSON.stringify([...newData]));
                    state.favourites = [...newData];
                    state.countFavourites = newData.length;
                    state.favouritesID = newData.map((item: MainPeopleScheme) => item?.id);
                } else {
                    const newData = [{
                        ...action.payload,
                        favourite: 1,
                    }]
                    localStorage.setItem('favourites', JSON.stringify([...newData]));
                    state.favourites = [...newData];
                    state.countFavourites = 1;
                    state.favouritesID = newData.map((item: MainPeopleScheme) => item?.id);
                }
            } else {
                const newData = savedData?.filter((item: MainPeopleScheme) => item.id !== action.payload.id)
                localStorage.setItem('favourites', JSON.stringify([...newData]));
                state.favourites = [...newData];
                state.countFavourites = newData.length;
                state.favouritesID = newData.map((item: MainPeopleScheme) => item?.id);
                if (savedData?.length === 1) {
                    localStorage.removeItem('favourites');
                    state.favourites = [];
                    state.countFavourites = 0;
                    state.favouritesID = [];
                } 
            }
        },
        setFavouritesArr: (state, action) => {
            const savedStorage = localStorage.getItem('favourites');
            const savedData = savedStorage ? JSON.parse(savedStorage) : null;
            if (savedData) {
                const uniquePayload = action.payload.filter((item: MainPeopleScheme) => 
                    !savedData.some((savedItem: MainPeopleScheme) => savedItem.id === item.id)
                );
                const newData = [...savedData, 
                    ...uniquePayload.map((item: MainPeopleScheme) => ({
                        ...item,
                        favourite: 1
                    }))
                ];
                localStorage.setItem('favourites', JSON.stringify(newData));
                state.favourites = [...newData];
                state.countFavourites = newData.length;
                state.favouritesID = newData.map((item: MainPeopleScheme) => Number(item.id));
            } else {
                const newData = action.payload.map((item: MainPeopleScheme) => ({
                    ...item,
                    favourite: 1
                }))
                localStorage.setItem('favourites', JSON.stringify([...newData]));
                state.favourites = [...newData];
                state.countFavourites = newData.length;
                state.favouritesID = newData.map((item: MainPeopleScheme) => Number(item?.id));

            }
        },
        removeFavouritesArr: (state, action) => {
            const savedStorage = localStorage.getItem('favourites');
            const savedData = savedStorage ? JSON.parse(savedStorage) : null;
            if (savedData) {
                const newData = savedData.filter((item: MainPeopleScheme) => !action.payload.includes(item.id));
                if (newData.length > 0) {
                    localStorage.setItem('favourites', JSON.stringify(newData));
                    state.favourites = [...newData];
                    state.countFavourites = newData.length;
                    state.favouritesID = newData.map((item: MainPeopleScheme) => Number(item.id));
                } else {
                    localStorage.removeItem('favourites');
                    state.favourites = [];
                    state.countFavourites = 0;
                    state.favouritesID = [];
                }
            }
        },
        loadInfoFavourites: (state) => {
            const savedStorage = localStorage.getItem('favourites');
            const savedData = savedStorage ? JSON.parse(savedStorage) : null;
            if (savedData) {
                state.countFavourites = savedData.length;
                state.favourites = [...savedData];
                state.favouritesID = savedData.map((item: MainPeopleScheme) => item?.id);
            } else {
                state.countFavourites = 0;
                state.favourites = [];
                state.favouritesID = [];
            }
        },
    }
})
  
export const { actions: FavouritePageActions } = FavouritePageSlice;
export const { reducer: FavouritePageReducer } = FavouritePageSlice;