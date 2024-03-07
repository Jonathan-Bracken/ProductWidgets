import styles from "./tooltip.module.css";
import React, { MouseEvent, ReactNode, useState } from "react";

interface TooltipProps {
    id: number;
    tooltipContent: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ id, tooltipContent }) => {
    const [hovered, setHovered] = useState(false);
    // Explicitly define the type for delayHandler
    const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

    const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (delayHandler) {
            clearTimeout(delayHandler);
        }
        setDelayHandler(setTimeout(() => {
            setHovered(true);
        }, 300));
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (delayHandler) {
            clearTimeout(delayHandler);
        }
        setDelayHandler(setTimeout(() => {
            setHovered(false);
        }, 300));
    };

    return (
        <span className={styles.tooltipIconWrapper}>
            <div className={styles.tooltipIcon} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <i className="fa fa-regular fa-circle-info"/>
                <div
                    className={hovered ? styles.tooltipContent : `${styles.tooltipContent} ${styles.hidden}`}
                    id={`informationTooltip-${id}`}
                >
                    {tooltipContent}
                </div>
            </div>
        </span>
    );
};

export default Tooltip;