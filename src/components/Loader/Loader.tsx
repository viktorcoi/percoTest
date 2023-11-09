import styles from './Loader.module.scss';
import { FC } from 'react';

interface Props {
    className?: string;
    theme?: string;
}

export const themeLoader = {
    'main': styles.main,
    'second': styles.second,
};

const Loader: FC<Props> = (props) => {

    const {
        className = '',
        theme = '',
    } = props;

    return (
        <div className={`${styles.loader} ${className} ${theme}`}/>
    )
}

export default Loader;