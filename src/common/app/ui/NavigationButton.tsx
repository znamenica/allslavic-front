import Button from "@mui/material/Button";
import * as React from "react";
import {FC} from "react";

const NavigationButton: FC<{ onNavigate: () => void, label: string }> = ({
    onNavigate,
    label,
}) => {
    return (
        <Button
            onClick={onNavigate}
            sx={{ my: 2, color: 'white', display: 'block' }}
        >
            {label}
        </Button>
    )
};

export default NavigationButton;
