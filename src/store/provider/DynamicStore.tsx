import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey, ReduxStoreWithManager } from './config/StateScheme';
import { FC, useEffect, ReactNode } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [reducerKey: string]: Reducer;
}

interface DynamicStoreProps {
    children?: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

const DynamicStore: FC<DynamicStoreProps> = (props) => {

    const {
        children,
        reducers,
        removeAfterUnmount
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([reducerKey, reducer]) => {
            store.reducerManager.add(reducerKey as StateSchemaKey, reducer);
            dispatch({type: `@INIT ${reducerKey} reducer`});
        })
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([reducerKey, reducer]) => {
                    store.reducerManager.remove(reducerKey as StateSchemaKey);
                    dispatch({type: `@DESTROY ${reducerKey} reducer`});
                })
            }
        };
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {children}
        </>
    );
}

export default DynamicStore;