import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import {Outlet} from "react-router-dom";

const Layout: React.FC = ({ children }) => {
    return (
        <Container maxWidth="xl">
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
};

export default Layout;
