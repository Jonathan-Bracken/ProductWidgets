import React from "react";
import styles from "./colour-picker.module.css";
import cn from "classnames";
import { availableColours } from "../available-colours";

interface Colour {
  id: number;
  description: "white" | "black" | "blue" | "green" | "beige";
  hexCode: string;
}

interface ColourPickerProps {
    id: number;
    fieldName: string;
    selectedColourDescription: Colour['description'];
    setColour: (id: number, colourDescription: Colour['description'], fieldName: string) => void;
}

const ColourPicker: React.FC<ColourPickerProps> = ({ id, fieldName, selectedColourDescription, setColour }) => {
    return (
        <div className={styles.colourPicker}>
            {availableColours.map(colour => (
                <button
                    key={colour.id}
                    className={cn(styles.colourSelect, { [styles.selected]: selectedColourDescription === colour.description })}
                    style={{ backgroundColor: colour.hexCode }}
                    title={colour.description}
                    onClick={() => setColour(id, colour.description, fieldName)}
                />
            ))}
        </div>
    );
};

export default ColourPicker;