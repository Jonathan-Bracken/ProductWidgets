// ColourPicker.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColourPicker from "./ColourPicker";

const availableColours = [
    { id: 1, description: "white", hexCode: "#FFFFFF" },
    { id: 2, description: "black", hexCode: "#000000" },
    { id: 3, description: "blue", hexCode: "#2E3A8C" },
    { id: 4, description: "green", hexCode: "#3B755F" },
    { id: 5, description: "beige", hexCode: "#F2EBDB" }
];

test("Renders a ColourPicker with correct number of options and tests selection of colours.", () => {
    const mockSetColour = jest.fn();
    render(
        <ColourPicker
            id={1}
            fieldName="selectedColor"
            selectedColourDescription="white"
            setColour={mockSetColour}
        />
    );

    // Check if all colour options are rendered
    availableColours.forEach(colour => {
        expect(screen.getByTitle(colour.description)).toBeInTheDocument();
    });

    // Simulate clicking a colour option
    const blueColourOption = screen.getByTitle("blue");
    fireEvent.click(blueColourOption);

    // Check if setColour was called with correct arguments
    expect(mockSetColour).toHaveBeenCalledWith(1, "blue", "selectedColor");
});