import { FC } from 'react';
import styles from './CheckBox.module.scss';

interface Props {
    className?: string;
    name?: string;
    value?: number;
    checked?: boolean;
    onChange?: (value: number) => void;
}

const CheckBox: FC<Props> = (props) => {

    const {
        className = '',
        name,
        value,
        checked,
        onChange = () => {},
    } = props;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.currentTarget.value));
    }

    return (
        <label className={`${checked ? styles.checked : ''} ${styles.box} ${className}`}>
            <input title='checkbox'
                checked={checked} value={value} 
                name={name} type='checkbox'
                onChange={handleChange}
            />
        </label>
    )
}

export default CheckBox;