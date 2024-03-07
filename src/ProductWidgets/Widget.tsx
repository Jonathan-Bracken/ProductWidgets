import CheckBox from "../SharedComponents/CheckBox/CheckBox";
import ColourPicker from "../SharedComponents/ColourPicker/ColourPicker";
import Tooltip from "../SharedComponents/Tooltip/Tooltip";
import ToggleSwitch from "../SharedComponents/ToggleSwitch/ToggleSwitch";
import { getTextColour } from "../SharedComponents/shared-functions";
import styles from './product-widgets.module.css';
import { availableColours } from "../SharedComponents/available-colours";

interface WidgetProps {
    widget: {
        id: number;
        type: "carbon" | "plastic bottles" | "trees";
        amount: number;
        action: "collects" | "plants" | "offsets";
        active: boolean;
        linked: boolean;
        selectedColor: "white" | "black" | "blue" | "green" | "beige";
    };
    toggleChecked: (event: React.ChangeEvent<HTMLInputElement>, id: number, fieldName: string) => void;
    setColour: (id: number, colourDescription: "white" | "black" | "blue" | "green" | "beige", fieldName: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, toggleChecked, setColour }) => {
    const getWidgetBadge = () => {
        const backgroundColour = availableColours.find(x => x.description === widget.selectedColor)?.hexCode ?? "#FFFFFF";
        const textColourHex = getTextColour(backgroundColour);
        const textColourDescription = textColourHex === "#FFFFFF" ? "white" : "green";
        
        // It is to be assumed that carbon is the only measurement of weight, and this will always be measured in kgs.
        const amountCaption = widget.type === "carbon" ? widget.amount + " kgs of " + widget.type : widget.amount + " " + widget.type;

        return (
            <div
                className={styles.widgetBadge}
                role="button"
                style={{
                    backgroundColor: backgroundColour,
                    color: textColourHex,
                    cursor: widget.linked ? "pointer" : "default"
                }}
                onClick={widget.linked ? () => { window.location.href = ""; } : undefined}
            >
                <div className="row">
                    <div className={styles.logoContainer}>
                        <img
                            src={`${process.env.PUBLIC_URL}/greenspark-logo-` + textColourDescription + `.png`}
                            alt="Greenspark Logo"
                        />
                    </div>
                    <div className={styles.widgetTitleContainer}>
                        <div className={styles.widgetAction}>This product {widget.action}</div>
                        {<div className={styles.widgetAmount}>{ amountCaption }</div>}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.widgetContainer + " col-12 col-sm-12 col-md-6 col-lg-4"} key={widget.id}>
            { getWidgetBadge() }
            <div className={styles.widgetActionRow}>
                Link to Public Profile
                <Tooltip
                    id={widget.id}
                    tooltipContent={
                        <div>
                            This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.
                            <br /><br />
                            <a className="content-link" href="">View Public Profile</a>
                        </div>
                    }
                />
                <CheckBox
                    id={widget.id}
                    checked={widget.linked}
                    toggleChecked={toggleChecked}
                    fieldName="linked"
                />
            </div>
            <div className={styles.widgetActionRow}>
                Badge colour
                <ColourPicker
                    id={widget.id}
                    fieldName="selectedColor"
                    selectedColourDescription={widget.selectedColor}
                    setColour={setColour}
                />
            </div>
            <div className={styles.widgetActionRow}>
                Activate badge
                <ToggleSwitch
                    id={widget.id}
                    checked={widget.active}
                    toggleChecked={toggleChecked}
                    fieldName="active"
                />
            </div>
        </div>
    );
};

export default Widget;