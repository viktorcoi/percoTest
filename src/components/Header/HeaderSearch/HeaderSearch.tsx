import { useEffect, useRef, useState } from 'react';
import styles from './HeaderSearch.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { searchPeoples } from '../../../api/headerSearch/asyncThunks/searchPeoples';
import { AppDispatch } from '../../../store/provider/config/store';
import DynamicStore, { ReducersList } from '../../../store/provider/DynamicStore';
import { HeaderSearchReducer, HeaderSearchScheme } from '../../../store/headerSearch/slice/HeaderSearchSlice';
import { getListSearch } from '../../../store/headerSearch/selectors/getListSearch';
import { Link } from 'react-router-dom';
import Loader, { themeLoader } from '../../Loader/Loader';

const initialState: ReducersList = {
    headerSearch: HeaderSearchReducer
}

type HeaderSearchState = {
    headerSearch: HeaderSearchScheme;
};

const HeaderSearch = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [isLoad, setLoad] = useState(false)
    const countPeoples = useSelector((state: HeaderSearchState) => state?.headerSearch?.countPeoples || false);
    const listSearch = useSelector(getListSearch);

    const blockRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
                setValue('');
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        
      }, []);

    const handleSerach = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        setLoad(true);
        try {
            const response = await dispatch(searchPeoples(e.currentTarget.value));
            if (response.payload === 200) setLoad(false)
        } catch (e) {
            console.log(e);
            setLoad(false);
        }
    }

    return (
        <div ref={blockRef} className={styles.search}>
            <div className={styles.input}>
                <input placeholder="Search" type='text' value={value} onInput={handleSerach}/>
                <button title='clear' type='button' onClick={() => setValue('')} className={`${styles.clear} ${value.length ? styles.show : ''}`} />
            </div>
            <div className={`${styles.results} ${value?.length ? styles.show : ''}`}>
                {value.length ?
                    <DynamicStore reducers={initialState} removeAfterUnmount={true}>
                        {!countPeoples && !isLoad ? <p className={styles.plug}>No results</p> : 
                            isLoad ? <Loader className={styles.loader} theme={themeLoader.second}/> :
                            listSearch?.map((item, key) => (
                                <Link onClick={() => setValue('')} key={key} to={`/peoples/${item?.id}`}>{item?.name}</Link>
                            ))
                        }
                    </DynamicStore>
                    : <></>
                }
            </div>
        </div>
    )
}

export default HeaderSearch;