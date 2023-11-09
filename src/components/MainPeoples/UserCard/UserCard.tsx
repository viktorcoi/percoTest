import { Link } from 'react-router-dom';
import { FC } from 'react';
import styles from './UserCard.module.scss';
import { MainPeopleScheme, MainPeoplesActions } from '../../../store/mainPeoples/slice/MainPeoplesSlice';
import { useDispatch } from 'react-redux';
import { FavouritePageActions } from '../../../store/fafouritePage/slice/FavouritePageSlice';
import CheckBox from '../../ui/CheckBox/CheckBox';

interface Props {
    data: MainPeopleScheme;
    handleSelect?: (value: number) => void;
    checked?: boolean;
}

const UserCard: FC<Props> = (props) => {

    const {
        data,
        checked,
        handleSelect = () => {},
    } = props

    const {
        id,
        name,
        height,
        mass,
        color,
        favourite,
    } = props.data;

    const dispatch = useDispatch();

    const handleFavourite = () => {
        dispatch(MainPeoplesActions.setFavourite((id)));
        dispatch(FavouritePageActions.setFavourites(data))
    }

    return (
        <div className={styles.wrapper}>
            <Link to={`/peoples/${id}`} className={styles.link}></Link>
            <p><span>Name:</span> {name}</p>
            <p><span>Height:</span> {height}</p>
            <p><span>Mass:</span> {mass}</p>
            <p><span>Hair Color:</span> {color}</p>
            <CheckBox className={styles.box}
                checked={checked}
                name={name}
                value={id}
                onChange={handleSelect}
            />
            <button type='button' title={''} onClick={handleFavourite} className={`${styles.like} ${favourite ? styles.liked : ''}`}/>
        </div>
    )
}

export default UserCard;