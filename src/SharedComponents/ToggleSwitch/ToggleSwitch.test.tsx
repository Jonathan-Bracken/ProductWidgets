// ToggleSwitch.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleSwitch from "./ToggleSwitch";

test("Renders and tests the toggling of a Toggle Switch.", () => {
    const mockToggleChecked = jest.fn();
    render(<ToggleSwitch id={1} fieldName="linked" checked={false} toggleChecked={mockToggleChecked} />);

    const toggleInput = screen.getByRole("switch");
    expect(toggleInput).not.toBeChecked();

    fireEvent.click(toggleInput);
    
    expect(mockToggleChecked).toHaveBeenCalled();
    expect(mockToggleChecked.mock.calls[0][1]).toBe(1); // Checks if the second argument is 1
    expect(mockToggleChecked.mock.calls[0][2]).toBe("linked"); // Checks if the third argument is "linked"
});