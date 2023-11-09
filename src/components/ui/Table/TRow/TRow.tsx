import { useDispatch } from 'react-redux';
import { MainPeopleScheme, MainPeoplesActions } from '../../../../store/mainPeoples/slice/MainPeoplesSlice';
import CheckBox from '../../CheckBox/CheckBox';
import styles from './TRow.module.scss';
import { FC } from 'react';
import { FavouritePageActions } from '../../../../store/fafouritePage/slice/FavouritePageSlice';
import { Link, useLocation } from 'react-router-dom';
import { PeopleActions } from '../../../../store/peoplePage/slice/PeopleSlice';

interface Props {
    data: MainPeopleScheme;
    handleSelect?: (value: number) => void;
    checked?: boolean;
    withoutSelect?: boolean;
    withCheckFavourite?: boolean;
    withoutLink?: boolean;
}
const TRow: FC<Props> = (props) => {

    const {
        data,
        checked,
        handleSelect = () => {},
        withoutSelect = false,
        withCheckFavourite = false,
        withoutLink = false,
    } = props;

    const {
        id,
        name,
        height,
        mass,
        color,
        favourite,
    } = props.data;

    const dispatch = useDispatch();
    const location = useLocation();

    const handleFavourite = () => {
        if (location.pathname === '/peoples') {
            dispatch(MainPeoplesActions.setFavourite((id)));
        } else {
            dispatch(PeopleActions.setFavourite())
        }
        dispatch(FavouritePageActions.setFavourites(data))
    }

    return (
        <tr>
            {withoutSelect ? <></> :
                <td className={styles.td}>
                    <CheckBox className={styles.box}
                        checked={checked}
                        name={name}
                        value={id}
                        onChange={handleSelect}
                    />
                </td>
            }
            <td className={styles.td}>
                {withoutLink ? name :
                    <Link to={`/peoples/${id}`} className={styles.link}>{name}</Link>
                }
            </td>
            <td className={styles.td}>
                {height}
            </td>
            <td className={styles.td}>
                {mass}
            </td>
            <td className={styles.td}>
                {color}
            </td>
            <td className={styles.td}>
                {withCheckFavourite && favourite ? 'Yes' :
                    <button type='button' title={''} onClick={handleFavourite} className={`${styles.like} ${favourite ? styles.liked : ''}`}/>
                }
            </td>
        </tr>
    )
}

export default TRow;