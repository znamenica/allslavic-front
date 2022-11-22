import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, Chip, List, ListItem, ListItemAvatar, ListItemText, Pagination} from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import LyricsIcon from '@mui/icons-material/Lyrics';
import FeedIcon from '@mui/icons-material/Feed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import {currentPageItemsSelector, getLibraryItems, setPage, totalPageSelector} from "../../store/reducers/library";
import {LibraryTag} from "../api/library";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Preferences} from "../../lib/constants";
import {useRouter} from "next/router";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../api";
import {getTagsItems} from "../../store/reducers/tags";

const StoryAvatar = ({ value }: { value: LibraryTag }) => {
    switch (value) {
        case LibraryTag.PROSE:
            return <AutoStoriesIcon />;
        case LibraryTag.POEM:
            return <LyricsIcon />;
        case LibraryTag.ARTICLE:
            return <ScienceIcon />;
        case LibraryTag.NEWS:
            return <FeedIcon />;
        case LibraryTag.EDUCATION:
            return <SchoolIcon />;
        default:
            return null;
    }
};

const Library = () => {
    const [itemTypes, setItemTypes] = useState<LibraryTag[]>([]);
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const [transcription, setTranscription] = useState<string|null>(null);
    const router = useRouter();
    const {t} = useTranslation('common');
    const items = useAppSelector(currentPageItemsSelector);
    const totalPage = useAppSelector(totalPageSelector);
    const dispatch = useAppDispatch();
    const onChipClick = (item: LibraryTag) => {
        if (itemTypes.includes(item)) {
            const items = [...itemTypes].filter(e => e !== item);
            setItemTypes(items);
        } else {
            const items = [...itemTypes];
            items.push(item);
            setItemTypes(items);
        }
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };
    const onAdd = () => {
        router.push('/library/add');
    };
    const handlerEdit = (id) => {
        router.push(`/library/${id}/edit`);
    };
    const handlerDelete = (id) => {
        const token = localStorage.getItem("access_token");
        Api.texts.deleteById(id, token);
        dispatch(getLibraryItems());
    };
    useEffect(() => {
        setTranscription(localStorage.getItem(Preferences.transcription));
    }, []);
    useEffect(() => {
        dispatch(getLibraryItems(itemTypes));
    }, [dispatch, itemTypes ]);
    useEffect(() => {
        dispatch(getTagsItems());
    }, []);
    const getOutlined = (value: LibraryTag) => itemTypes.includes(value) ? "filled" : "outlined";
    return (
        <Box>
            <Head>
                <title>{t('library')}</title>
                <meta name="description" content={t('library_desc')} />
            </Head>
            <Typography variant="h3" gutterBottom component="div">
                {t('library')}
            </Typography>
            {isLoggedIn && (
                <Box>
                    <Button variant="contained" onClick={onAdd}>{t('add')}</Button>
                    <Button onClick={() => router.push('/library_old')}>
                        {t('library_old')}
                    </Button>
                </Box>
            )}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: 1, marginBottom: 1, }}>
                <Typography variant="subtitle1">
                    {t('categories')}
                </Typography>
                <Chip
                    label={t('poems')}
                    variant={getOutlined(LibraryTag.POEM)}
                    onClick={() => onChipClick(LibraryTag.POEM)}
                />
                <Chip
                    label={t('prose')}
                    variant={getOutlined(LibraryTag.PROSE)}
                    onClick={() => onChipClick(LibraryTag.PROSE)}
                />
                <Chip
                    label={t('articles')}
                    variant={getOutlined(LibraryTag.ARTICLE)}
                    onClick={() => onChipClick(LibraryTag.ARTICLE)}
                />
                <Chip
                    label={t('news')}
                    variant={getOutlined(LibraryTag.NEWS)}
                    onClick={() => onChipClick(LibraryTag.NEWS)}
                />
                <Chip
                    label={t('studying')}
                    variant={getOutlined(LibraryTag.EDUCATION)}
                    onClick={() => onChipClick(LibraryTag.EDUCATION)}
                />
            </Box>
            <Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {items.map(item => (
                        <ListItem
                            alignItems="flex-start"
                            key={item.id}
                            sx={{ cursor: "pointer" }}
                            onClick={() => router.push(`/library/${item.id}`)}
                        >
                            <ListItemAvatar>
                                <StoryAvatar value={item.category} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <React.Fragment>
                                        {item.abstract}
                                    </React.Fragment>
                                }
                            />
                            {isLoggedIn && (
                                <EditIcon
                                    sx={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '40px',
                                        cursor: "pointer"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlerEdit(item.id);
                                    }}
                                />
                            )}
                            {isLoggedIn && (
                                <DeleteIcon
                                    sx={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '10px',
                                        cursor: "pointer"
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlerDelete(item.id);
                                    }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
                <Pagination
                    count={totalPage}
                    showFirstButton
                    showLastButton
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    )
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default Library;
