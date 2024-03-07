import React from "react";
import styles from "./toggle-switch.module.css";

interface ToggleSwitchProps {
    id: number;
    fieldName: string;
    checked: boolean;
    toggleChecked: (event: React.ChangeEvent<HTMLInputElement>, id: number, fieldName: string) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, fieldName, checked, toggleChecked }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleChecked(event, id, fieldName);
    };

    return (
        <div className={styles.toggleSwitchWrapper}>
            <label className={styles.toggleSwitch}>
                <input
                    id={`toggle-switch-${id}-${fieldName}`}
                    checked={checked}
                    className={styles.switchInput}
                    role="switch"
                    type="checkbox"
                    onChange={handleChange}
                    aria-checked={checked}
                    aria-label={`Switch for ${fieldName}`}
                />
                <span className={styles.switchHandle} aria-hidden="true" />
            </label>
        </div>
    );
};

export default ToggleSwitch;
