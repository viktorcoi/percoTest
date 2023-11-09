import { createAsyncThunk } from "@reduxjs/toolkit";
import { MainPeopleScheme, MainPeoplesActions } from "../../../store/mainPeoples/slice/MainPeoplesSlice";

interface Person {
    url: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
}

const checkFavourite = (id: number) => {
    const savedDataString = localStorage.getItem('favourites');
    const savedData = savedDataString ? JSON.parse(savedDataString) : null;
    let favourite = 0;
    if (savedData) {
        if (savedData?.find((item: MainPeopleScheme) => item?.id === id)) favourite = 1;
    }
    return favourite;
}

export const getPeoples = createAsyncThunk(
    'mainPeoples/getPeoples',
    async(page: number, ThunkApi) => {
      try {
        const response = await fetch(
            `https://swapi.dev/api/people?page=${page}`, 
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

                const nextPage = Number(data?.next?.split('?page=')[1]) || 0;
                const prevPage =  Number(data?.previous?.split('?page=')[1]) || 0;;
                const peoples = data?.results?.map((item: Person) => ({
                    id: parseInt(item?.url?.split('/people/')[1]),
                    name: item?.name,
                    height: item?.height,
                    mass: item?.mass,
                    color: item?.hair_color,
                    favourite: checkFavourite(parseInt(item?.url?.split('/people/')[1])),
                }));

                ThunkApi.dispatch(MainPeoplesActions.setPeoples(peoples));
                ThunkApi.dispatch(MainPeoplesActions.setNextPage(nextPage));
                ThunkApi.dispatch(MainPeoplesActions.setPrevPage(prevPage));
            } else {
                return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
            }
        } catch (e) {
            console.log(e);
            return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
        }
    }
)