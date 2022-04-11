import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import I18n from "../i18n";
import NavigationButton from "./ui/NavigationButton";
import Config from "./utils/Config";
import MenuIcon from '@mui/icons-material/Menu';

const settings = ['Profile', 'Logout'];
const languages = ['ru', 'en'];
const pages = ["grammar", "dictionary", "tools", "slavic-circle"];

const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElLanguage, setAnchorElLanguage] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const onNavigate = (page: string) => {
        switch (page) {
            case "slavic-circle":
                window.open(Config.get().CIRCLE_API, "_blank");
                break;
            default:
                navigate(page);
        }
    }

    const handleCloseNavMenu = (page: string) => {
        onNavigate(page);
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => {
        setAnchorElLanguage(null);
    };

    const onChangeLang = (lang: string) => {
        handleCloseLanguageMenu();
        I18n.changeLanguage(lang);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => {
                            navigate("/");
                        }}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: "pointer" }}
                    >
                        {t('logo')}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(page => (
                            <NavigationButton
                                onNavigate={() => onNavigate(page)}
                                label={t(page)}
                            />
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{t(page)}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        {t('logo')}
                    </Typography>
                    <Box sx={{ flexGrow: 0, marginRight: '10px', xs: 'none', md: 'flex' }}>
                        <Tooltip title="Change language">
                            <IconButton onClick={handleOpenLanguageMenu} sx={{ p: 0 }}>
                                <Typography
                                    sx={{ marginRight: 1 }}
                                    variant="body2"
                                    color="white"
                                >
                                    {t(I18n.language)}
                                </Typography>
                                <LanguageIcon sx={{ color: 'white'}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '35px' }}
                            id="menu-appbar"
                            anchorEl={anchorElLanguage}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElLanguage)}
                            onClose={handleCloseLanguageMenu}
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang} onClick={() => onChangeLang(lang)}>
                                    <Typography textAlign="center">{t(lang)}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
