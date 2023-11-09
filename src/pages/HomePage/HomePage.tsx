import styles from './HomePage.module.scss'
import Container from '../../components/Container/Container';
import DynamicStore, { ReducersList } from '../../store/provider/DynamicStore';
import { HomePageReducer, HomePageScheme } from '../../store/homePage/slice/HomePageSlice';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPeoples } from '../../api/homePage/asyncThunks/getPeoples';
import { AppDispatch } from '../../store/provider/config/store';
import Loader, { themeLoader } from '../../components/Loader/Loader';
import { FavouritePageScheme } from '../../store/fafouritePage/slice/FavouritePageSlice';

const initialState: ReducersList = {
    homePage: HomePageReducer
}

type HomeState = {
    homePage: HomePageScheme;
};

type FavouriteState = {
    favourites: FavouritePageScheme;
};

const HomePage = () => {

    const dispatch = useDispatch<AppDispatch>();

    const countPeoples = useSelector((state: HomeState) => state?.homePage?.countPeoples || 0)
    const countFavourites = useSelector((state: FavouriteState) => state?.favourites?.countFavourites || 0)
    const isLoad = useSelector((state: HomeState) => state?.homePage?.isLoad || false)

    useEffect(() => {
        const fetchPeoples = async () => {
            try {
                await dispatch(getPeoples());
            } catch (e) {
                console.log(e);
            }
        }

        fetchPeoples();
    }, [])

    return (
        <DynamicStore reducers={initialState} removeAfterUnmount={true}>
            <Container className={styles.wrapper}>
                <h1 className={styles.wrapper__title}>Page</h1>
                <nav className={styles.links}>
                    <Link className={styles.peoples} to='/peoples'>
                        <p>List Peoples</p>
                        {isLoad ? <Loader className={styles.loader} theme={themeLoader.second}/> :
                            <span>{String(countPeoples)}</span>
                        }
                    </Link>
                    <Link className={styles.favourites} to='/favourites'>
                        <p>Favourites</p>
                        {isLoad ? <Loader className={styles.loader} theme={themeLoader.second}/> :
                            <span>{String(countFavourites)}</span>
                        }
                    </Link>
                </nav>
            </Container>
        </DynamicStore>
    );
}
  
export default HomePage;