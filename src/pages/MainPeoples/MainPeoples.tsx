import styles from './MainPeoples.module.scss';
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container"
import { AppDispatch } from "../../store/provider/config/store";
import { getPeoples } from "../../api/MainPeoples/asyncThunks/getPeoples";
import { useEffect, useState } from 'react';
import { MainPeoplesActions, MainPeoplesReducer, MainPeoplesScheme } from "../../store/mainPeoples/slice/MainPeoplesSlice";
import DynamicStore, { ReducersList } from "../../store/provider/DynamicStore";
import Loader, { themeLoader } from "../../components/Loader/Loader";
import { getListPeoples } from '../../store/mainPeoples/selectors/getListPeoples';
import UserCard from '../../components/MainPeoples/UserCard/UserCard';
import { getListSelected } from '../../store/mainPeoples/selectors/getListSelected';
import Button, { themeButton } from '../../components/ui/Button/Button';
import { getFavouritesID } from '../../store/fafouritePage/selecors/getFavouritesID';
import { FavouritePageActions } from '../../store/fafouritePage/slice/FavouritePageSlice';
import Table from '../../components/ui/Table/Table';
import THead from '../../components/ui/Table/THead/THead';
import TRow from '../../components/ui/Table/TRow/TRow';

const initialState: ReducersList = {
    mainPeoples: MainPeoplesReducer
}

type MainPeoplesState = {
    mainPeoples: MainPeoplesScheme;
};

const MainPeoples = () => {

    const dispatch = useDispatch<AppDispatch>();

    const isLoad = useSelector((state: MainPeoplesState) => state?.mainPeoples?.isLoad || false);
    const nextPage = useSelector((state: MainPeoplesState) => state?.mainPeoples?.nextPage || 0);
    const prevPage = useSelector((state: MainPeoplesState) => state?.mainPeoples?.prevPage || 0)
    const listPeoples = useSelector(getListPeoples);
    const selected = useSelector(getListSelected);
    const favouritesID = useSelector(getFavouritesID);

    const [view, setView] = useState(false);

    useEffect(() => {
        const fetchPeoples = async () => {
            try {
                await dispatch(getPeoples(1));
            } catch (e) {
                console.log(e);
            }
        }

        fetchPeoples();
    }, [])

    const handleNextPage = async () => {
        await dispatch(getPeoples(nextPage));
        await dispatch(MainPeoplesActions.clearSelected());
    }

    const handlePrevPage = async () => {
        await dispatch(getPeoples(prevPage));
        await dispatch(MainPeoplesActions.clearSelected());
    }

    const handleSelect = (value: number) => {
        dispatch(MainPeoplesActions.setSelected(value));
    }

    const handleActionSelected = () => {
        if (selected.every((item) => favouritesID.includes(item))) {
            dispatch(MainPeoplesActions.removeFavouriteArr());
            dispatch(FavouritePageActions.removeFavouritesArr(selected));
        } else {
            dispatch(MainPeoplesActions.setFavouriteArr());
            dispatch(FavouritePageActions.setFavouritesArr(
               listPeoples.filter((item) => selected.includes(item.id))
            ))
        }
        dispatch(MainPeoplesActions.clearSelected());
    }

    const handleActionAll = () => {
        if (listPeoples.every((item) => favouritesID.includes(item.id))) {
            dispatch(MainPeoplesActions.removeFavouriteAll())
            dispatch(FavouritePageActions.removeFavouritesArr(
                listPeoples.map((item) => item.id)
            ));
        } else {
            dispatch(MainPeoplesActions.setFavouriteAll());
            dispatch(FavouritePageActions.setFavouritesArr(listPeoples));
        }
        dispatch(MainPeoplesActions.clearSelected());
    }

    return (
        <DynamicStore reducers={initialState} removeAfterUnmount={true}>
            <Container className={styles.wrapper}>
                <div className={styles.head}>
                    <h2 className={styles.title}>List peoples</h2>
                    <Button onClick={() => setView((state => !state))} disabled={isLoad} theme={themeButton.main}>{!view ? "Table" : "BLocks"}</Button>
                    <div className={styles.buttons}>
                        <Button disabled={!Boolean(selected.length) || isLoad} 
                            theme={themeButton.main} onClick={handleActionSelected}
                        >
                            {selected.every((item) => favouritesID.includes(item)) && selected.length ? 
                                'Remove selected from Favorites' : 'Add selected to Favorites'
                            }
                        </Button>
                        <Button disabled={isLoad} 
                            theme={themeButton.second} onClick={handleActionAll}
                        >
                            {listPeoples.every((item) => favouritesID.includes(item.id)) && !isLoad ? 
                                'Remove all from favourite' : 'Add all to favourite'
                            }
                        </Button>
                    </div>
                </div>
                {isLoad ? <Loader className={styles.loader} theme={themeLoader.main}/> :
                    <>
                        {!view ?
                            <div className={styles.list}>
                                {listPeoples?.map((item, key) => (
                                    <UserCard key={key} data={Object(item)}
                                        handleSelect={handleSelect}
                                        checked={Boolean(selected.find((id) => id === item?.id))}
                                    />
                                ))}
                            </div>
                            :
                            <Table className={styles.table}>
                                <THead listHead={['Select', 'Name', 'Height', 'Mass', 'Hair Color', 'Favourite']}/>
                                <tbody>
                                    {listPeoples?.map((item, key) => (
                                        <TRow key={key} data={Object(item)}
                                            handleSelect={handleSelect}
                                            checked={Boolean(selected.find((id) => id === item?.id))}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        }
                        {nextPage || prevPage ?
                            <div className={styles.pagination}>
                                <Button disabled={!prevPage} theme={themeButton.main} onClick={handlePrevPage}>{'< Prev'}</Button>
                                <Button disabled={!nextPage} theme={themeButton.main} onClick={handleNextPage}>{'Next >'}</Button>
                            </div>
                            : <></>
                        }
                    </>
                }
            </Container>
        </DynamicStore>
    )
}

export default MainPeoples;