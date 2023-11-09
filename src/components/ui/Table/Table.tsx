import styles from './Table.module.scss';
import { FC, ReactNode } from 'react';

interface Props {
    children?: ReactNode,
    className?: string;
}

const Table: FC<Props> = (props) => {

    const {
        children,
        className = '',
    } = props;

    return (
        <div className={styles.wrapper}>
            <table className={`${styles.table} ${className}`}>
                {children}
            </table>
        </div>
    )
}

export default Table;