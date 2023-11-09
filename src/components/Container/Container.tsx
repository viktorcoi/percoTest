import { FC, ReactNode } from 'react';
import styles from './Container.module.scss';

interface Props {
    className?: string;
    children: ReactNode;
}

const Container: FC<Props> = (props) => {

    const {
        className = '',
        children
    } = props;

    return (
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    )
}

export default Container;