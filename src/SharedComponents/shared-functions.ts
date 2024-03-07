// This function calculates whether to return a white or dark green text colour, based on the background.
export function getTextColour(hexBackgroundColour: string) {
    hexBackgroundColour = hexBackgroundColour.replace("#", "");
    const red = parseInt(hexBackgroundColour.substring(0, 2), 16);
    const green = parseInt(hexBackgroundColour.substring(2, 4), 16);
    const blue = parseInt(hexBackgroundColour.substring(4, 6), 16);
    const yiq = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
    return (yiq >= 140) ? "#3B755F" : "#FFFFFF";
}