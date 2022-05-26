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
import {useTranslation} from "next-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import NavigationButton from "./ui/NavigationButton";
import Config from "../utils/Config";
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const settings = ['profile', 'about'];
const languages = ['ru', 'en'];
const pages = ["grammar", "dictionary", "library", "tools", "slavic-circle"];

const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [showing, setShowing] = useState(false);
    const anchorElUser = useRef<any>(null);
    const anchorElLanguage = useRef<any>(null);
    const [elUser, setElUser] = useState<boolean|null>(null);
    const [elLanguage, setElLanguage] = useState<boolean|null>(null);

    const { t } = useTranslation('common');
    const router = useRouter();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const onNavigate = (page: string) => {
        switch (page) {
            case "slavic-circle":
                window.open(Config.get().CIRCLE_API);
                break;
            default:
                router.push(page);
        }
    }

    useEffect(() => {
        setShowing(true);
    }, []);

    const handleCloseNavMenu = (page: string) => {
        onNavigate(page);
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setElUser(true);
    };

    const handleCloseUserMenu = (setting: string) => {
        onNavigate(setting);
        setElUser(null);
    };

    const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
        setElLanguage(true);
    };

    const handleCloseLanguageMenu = () => {
        setElLanguage(null);
    };

    const onChangeLang = (lang: string) => {
        handleCloseLanguageMenu();
        router.push({ query: { locale: lang } });
    };

    return showing ? (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => {
                            router.push("/");
                        }}
                        sx={{ mr: 2, whiteSpace: 'pre-wrap', display: { xs: 'none', md: 'flex' }, cursor: "pointer" }}
                    >
                        {t('logo')}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(page => (
                            <NavigationButton
                                key={page}
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
                            <IconButton
                                ref={anchorElLanguage}
                                onClick={handleOpenLanguageMenu}
                                sx={{ p: 0 }}
                            >
                                <Typography
                                    sx={{ marginRight: 1 }}
                                    variant="body2"
                                    color="white"
                                    component="div"
                                >
                                    {/*{t(I18n.language)}*/}
                                </Typography>
                                <LanguageIcon sx={{ color: 'white'}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '35px' }}
                            id="menu-appbar"
                            anchorEl={anchorElLanguage.current}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(elLanguage)}
                            onClose={handleCloseLanguageMenu}
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang}>
                                    <Typography textAlign="center">
                                        <Link
                                            style={{ textDecoration: 'none', color: 'black'}}
                                            href={router.route}
                                            locale={lang}
                                        >
                                            {t(lang)}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                ref={anchorElUser}
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser.current}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(elUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{t(setting)}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    ) : null;
};

export default Navigation;
