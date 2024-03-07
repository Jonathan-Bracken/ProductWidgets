// CheckBox.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckBox from "./CheckBox";

test("Renders and tests the toggling of a Check Box.", () => {
    const mockToggleChecked = jest.fn();
    render(<CheckBox id={1} fieldName="active" checked={false} toggleChecked={mockToggleChecked} />);

    const checkboxInput = screen.getByRole("checkbox");
    expect(checkboxInput).not.toBeChecked();

    fireEvent.click(checkboxInput);
    expect(mockToggleChecked).toHaveBeenCalled();
    expect(mockToggleChecked.mock.calls[0][1]).toBe(1); // Checks if the second argument is 1
    expect(mockToggleChecked.mock.calls[0][2]).toBe("active"); // Checks if the third argument is "linked"
});