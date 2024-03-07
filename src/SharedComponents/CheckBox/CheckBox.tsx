import React from "react";
import styles from "./check-box.module.css";

interface CheckBoxProps {
    id: number;
    fieldName: string;
    checked: boolean;
    toggleChecked: (event: React.ChangeEvent<HTMLInputElement>, id: number, fieldName: string) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, checked, fieldName, toggleChecked }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleChecked(event, id, fieldName);
    };

    return (
        <div className={styles.checkBoxWrapper}>
            <label className={styles.checkBox} htmlFor={`checkbox-${id}-${fieldName}`}>
                <input
                    id={`checkbox-${id}-${fieldName}`}
                    checked={checked}
                    className={styles.checkBoxInput}
                    role="checkbox"
                    type="checkbox"
                    onChange={handleChange}
                    aria-label={`Check box for ${fieldName}`}
                />            
            </label>
        </div>
    );
};

export default CheckBox;