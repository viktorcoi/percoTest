import styles from './Header.module.scss';
import {ReactComponent as Logo}  from '../../assets/images/svg/logo.svg';
import { Link } from "react-router-dom";
import Container from '../Container/Container';
import { useSelector } from 'react-redux';
import { FavouritePageScheme } from '../../store/fafouritePage/slice/FavouritePageSlice';
import HeaderSearch from './HeaderSearch/HeaderSearch';

type FavouriteState = {
    favourites: FavouritePageScheme;
};

const Header = () => {

    const countFavourites = useSelector((state: FavouriteState) => state.favourites?.countFavourites || 0);

    return (
        <header className={styles.header}>
            <Container className={styles.wrapper}>
                <Link className={styles.logo} to='/'>
                    <Logo/>
                </Link>
                <HeaderSearch/>
                <nav className={styles.nav}>
                    <Link className={styles.peoples} to='/peoples'>
                        <p>List</p>
                    </Link>
                    <Link className={styles.like} to='/favourites'>
                        <p>Favourites</p>
                        {!countFavourites ? <></> :
                            <span className={styles.like__count}>
                                {Number(countFavourites) > 99 ? (`99+`) : String(countFavourites)}
                            </span>
                        }
                    </Link>
                </nav>
            </Container>
        </header>
    )
}

export default Header;