import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateScheme';
import createReducerManager from './ReducerManager';
import { FavouritePageReducer } from '../../fafouritePage/slice/FavouritePageSlice';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        favourites: (state = { isLoad: false, favourites: [], countFavourites: 0, favouritesID: [], selected: [] }, action) => FavouritePageReducer(state, action),
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: true,
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];