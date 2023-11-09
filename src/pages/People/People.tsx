import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container"
import { useEffect } from 'react';
import DynamicStore, { ReducersList } from "../../store/provider/DynamicStore";
import { PeopleReducer, PeopleScheme } from "../../store/peoplePage/slice/PeopleSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/provider/config/store";
import { getPeople } from "../../api/peoplePage/asyncThunks/getPeople";
import { getInfoPeople } from "../../store/peoplePage/selectors/getInfoPeople";
import Table from "../../components/ui/Table/Table";
import THead from "../../components/ui/Table/THead/THead";
import TRow from "../../components/ui/Table/TRow/TRow";
import styles from './People.module.scss';
import Loader, { themeLoader } from "../../components/Loader/Loader";

const initialState: ReducersList = {
    people: PeopleReducer
}

type PeopleState = {
    people: PeopleScheme;
};


const People = () => {

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const isLoad = useSelector((state: PeopleState) => state?.people?.isLoad || false);
    const people = useSelector(getInfoPeople);


    useEffect(() => {
        const fetcPeople = async () => {
            try {
                await dispatch(getPeople(Number(id)))
            } catch (e) {
                console.log(e);
            }
        }

        fetcPeople();
    }, [id])

    return (
        <DynamicStore reducers={initialState} removeAfterUnmount={true}>
            <Container className={styles.wrapper}>
                {isLoad ? <Loader className={styles.loader} theme={themeLoader.main}/> :
                    people?.id ? 
                    <Table className={styles.table}>
                        <THead listHead={['Name', 'Height', 'Mass', 'Hair Color', 'Favourite']}/>
                        <tbody>
                            <TRow data={Object(people)} withoutSelect={true}
                                withCheckFavourite={true}
                                withoutLink={true}
                            />
                        </tbody>
                    </Table>
                    : <p className={styles.plug}>People not found</p>
                }
            </Container>
        </DynamicStore>
    )
}

export default People;