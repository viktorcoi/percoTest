import { FC, HTMLProps, ReactNode } from "react";
import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLButtonElement> {
    children: ReactNode;
    theme?: string;
    className?: string;
    disabled?: boolean;
}

export const themeButton = {
    'main': styles.main,
    'second': styles.second,
};

const Button: FC<Props> = (props) => {

    const {
        children,
        className = '',
        theme = '',
        disabled = false,
        ...restProps
    } = props;

    return (
        <button {...restProps} disabled={disabled} 
            className={`${styles.button} ${className} ${theme}`} 
            type="button" title=""
        >
            {children}
        </button>
    )
}

export default Button;