import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import styles from './product-widgets.module.css';

// Define the features of a widget
interface Widget {
    id: number;
    type: "carbon" | "plastic bottles" | "trees";
    amount: number;
    action: "collects" | "plants" | "offsets";
    active: boolean;
    linked: boolean;
    selectedColor: "white" | "black" | "blue" | "green" | "beige";
}

const ProductWidgets: React.FC = () => {
    // State to store the list of widgets
    const [widgets, setWidgets] = useState<Widget[]>([]);
    const [widgetsLoaded, setWidgetsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch widget data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.mocki.io/v2/016d11e8/product-widgets");
                if (!response.ok) {
                    throw new Error("Network response was not ok"); // Throw if response is not 2xx
                }
                const data = await response.json();
                setWidgets(data);
                setWidgetsLoaded(true);
            } catch (e) {
                setError("Error fetching widgets.");
            }
        };

        fetchData(); // Call the async function to fetch data
    }, []); // Empty dependency array means this effect runs once on mount

    const setColour = (id: Number, colourDescription: "white" | "black" | "blue" | "green" | "beige", fieldName: string) => {
        const updatedWidgets = widgets.map(widget => {
            if (widget.id === id) {
                // Find the widget with this id and create a new object with the same properties, but update the selectedColor
                return { ...widget, [fieldName]: colourDescription };
            }
            // For all other widgets, return them unchanged
            return widget;
        });

        setWidgets(updatedWidgets);
    }

    const toggleChecked = (event: React.ChangeEvent<HTMLInputElement>, id: number, fieldName: string) => {
        const updatedWidgets = widgets.map(widget => {
            if (widget.id === id) {
                // Find the widget with this id and create a new object with the same properties, toggling the given property
                return { ...widget, [fieldName]: !widget[fieldName as keyof Widget] };
            }
            // For all other widgets, return them unchanged
            return widget;
        });

        setWidgets(updatedWidgets);
    }

    let componentContent;

    if (error) {
        componentContent = <p>{error}</p>;
    } else if (widgetsLoaded) {
        if (widgets.length > 0) {
            componentContent = widgets.map(widget => (
                <Widget
                    key={widget.id}
                    widget={widget}
                    toggleChecked={toggleChecked}
                    setColour={setColour}
                />
            ));
        } else {
            // Handle the case where there are no widgets to display
            componentContent = <p>No widgets found.</p>;
        }
    } else {
        componentContent = (
            <div className="loading-display" aria-live="polite">
                <h3>Loading Widgets ...</h3>
                <i className="loading-spinner fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            </div>
        );
    }

    return (
        <section className={styles.productWidgets}>
            <h1>Per product widgets</h1>
            <hr />
            <div className="row">
                {componentContent}
            </div>
        </section>
    );
};

export default ProductWidgets;