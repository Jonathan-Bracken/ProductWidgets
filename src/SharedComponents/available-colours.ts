// Hard coded list of possible colours and their hex codes
type ColourType = { 
    id: number; 
    description: "white" | "black" | "blue" | "green" | "beige"; 
    hexCode: string 
};

export const availableColours: ColourType[] = [
    { id: 1, description: "white", hexCode: "#FFFFFF" },
    { id: 2, description: "black", hexCode: "#000000" },
    { id: 3, description: "blue", hexCode: "#2E3A8C" },
    { id: 4, description: "green", hexCode: "#3B755F" },
    { id: 5, description: "beige", hexCode: "#F2EBDB" }
];