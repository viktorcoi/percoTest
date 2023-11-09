import { createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderSearchActions } from "../../../store/headerSearch/slice/HeaderSearchSlice";

let cancelSearch = new AbortController();

export const searchPeoples = createAsyncThunk(
    'headerSearch/searchPeoples',
    async(value: string, ThunkApi) => {
      try {
        if (cancelSearch) {
            cancelSearch.abort();
        }
        cancelSearch = new AbortController();

        const response = await fetch(
            `https://swapi.dev/api/people/?search=${value}`, 
            {
                method: "GET",
                cache: "no-cache",
                signal: cancelSearch.signal,
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
                ThunkApi.dispatch(HeaderSearchActions.setListSearch(
                    data?.results.map((item: {url: string, name: string}) => ({
                        id: parseInt(item?.url?.split('/people/')[1]),
                        name: item?.name,
                    }))
                ))
                ThunkApi.dispatch(HeaderSearchActions.setCountPeolpe(data?.count))
                return response.status
            } else {
                return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
            }
        } catch (e) {
            console.log(e);
            return ThunkApi.rejectWithValue('Произошла непредвиденная ошибка');
        }
    }
)