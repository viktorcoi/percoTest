import styles from './THead.module.scss';
import { FC } from 'react';

interface Props {
    listHead: string[];
}

const THead: FC<Props> = (props) => {

    const {
        listHead,
    } = props;

    return (
        <thead>
            <tr>
                {listHead.map((item, key) => (
                    <th className={styles.th} key={key}>{item}</th>
                ))}
            </tr>
        </thead>
    )
}

export default THead;