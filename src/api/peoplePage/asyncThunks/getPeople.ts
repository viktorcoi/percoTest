import { createAsyncThunk } from "@reduxjs/toolkit";
import { MainPeopleScheme } from "../../../store/mainPeoples/slice/MainPeoplesSlice";
import { PeopleActions } from "../../../store/peoplePage/slice/PeopleSlice";

const checkFavourite = (id: number) => {
    const savedDataString = localStorage.getItem('favourites');
    const savedData = savedDataString ? JSON.parse(savedDataString) : null;
    let favourite = 0;
    if (savedData) {
        if (savedData?.find((item: MainPeopleScheme) => item?.id === id)) favourite = 1;
    }
    return favourite;
}

export const getPeople = createAsyncThunk(
    'people/getPeople',
    async(id: number, ThunkApi) => {
      try {
        const response = await fetch(
            `https://swapi.dev/api/people/${id}`, 
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
        
                const people = {
                    id: parseInt(data?.url?.split('/people/')[1]),
                    name: data?.name,
                    height: data?.height,
                    mass: data?.mass,
                    color: data?.hair_color,
                    favourite: checkFavourite(parseInt(data?.url?.split('/people/')[1])),
                };

                ThunkApi.dispatch(PeopleActions.setPeople(people));
            } else {
                return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
            }
        } catch (e) {
            console.log(e);
            return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
        }
    }
)