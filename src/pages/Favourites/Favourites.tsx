import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Container from '../../components/Container/Container';
import UserCard from '../../components/MainPeoples/UserCard/UserCard';
import styles from './Favourites.module.scss';
import { getListPeoples } from '../../store/fafouritePage/selecors/getListPeoples';
import Button, { themeButton } from '../../components/ui/Button/Button';
import { getListSelected } from '../../store/fafouritePage/selecors/getListSelected';
import { FavouritePageActions } from '../../store/fafouritePage/slice/FavouritePageSlice';

const Favourites = () => {
   
    const dispatch = useDispatch();

    const listPeoples = useSelector(getListPeoples);
    const selected = useSelector(getListSelected);

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = listPeoples.slice(indexOfFirstCard, indexOfLastCard);

    const nextPage = indexOfLastCard < listPeoples.length;
    const prevPage = currentPage > 1;

    const handleNextPage = () => {
        if (nextPage) {
            setCurrentPage(currentPage + 1);
            dispatch(FavouritePageActions.clearSelected());
        }
    }

    const handlePrevPage = () => {
        if (prevPage) {
            dispatch(FavouritePageActions.clearSelected());
            setCurrentPage(currentPage - 1);
        }
    }

    const handleActionSelected = () => {
        dispatch(FavouritePageActions.removeFavouritesArr(selected));
        dispatch(FavouritePageActions.clearSelected());
    }

    const handleActionAll = () => {
        dispatch(FavouritePageActions.removeFavouritesArr(currentCards.map((item) => item.id)));
        dispatch(FavouritePageActions.clearSelected());
    }

    const handleSelect = (value: number) => {
        dispatch(FavouritePageActions.setSelected(value));
    }

    return (
        <Container className={styles.wrapper}>
            <div className={styles.head}>
                <h2 className={styles.title}>Favourites</h2>
                <div className={styles.buttons}>
                    <Button disabled={!Boolean(selected.length)} 
                        theme={themeButton.main} onClick={handleActionSelected}
                    >
                        Remove selected
                    </Button>
                    <Button
                        theme={themeButton.second} onClick={handleActionAll}
                    >
                        Remove favourites from this page
                    </Button>
                </div>
            </div>

            <div className={styles.list}>
                {currentCards?.map((item, key) => (
                    
                    <UserCard key={key} data={Object(item)}
                        handleSelect={handleSelect}
                        checked={Boolean(selected.find((id) => id === item?.id))}
                    />
                ))}
            </div>
            {listPeoples.length > cardsPerPage ?
                <div className={styles.pagination}>
                    <Button disabled={!prevPage} theme={themeButton.main} onClick={handlePrevPage}>{'< Prev'}</Button>
                    <Button disabled={!nextPage} theme={themeButton.main} onClick={handleNextPage}>{'Next >'}</Button>
                </div>
                : <></>
            }
        </Container>
    )
}

export default Favourites;