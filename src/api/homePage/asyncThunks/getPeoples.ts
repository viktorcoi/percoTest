import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomePageActions } from "../../../store/homePage/slice/HomePageSlice";

export const getPeoples = createAsyncThunk(
    'homePage/getPeoples',
    async(payload, ThunkApi) => {
      try {
        const response = await fetch(
            `https://swapi.dev/api/people`, 
            {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                },
            }
        );
        
        const data = await response.json();
            if (response.status === 200) {
                ThunkApi.dispatch(HomePageActions.setCountPeoples(data?.count))
            } else {
                return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
            }
        } catch (e) {
            console.log(e);
            return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
        }
    }
)