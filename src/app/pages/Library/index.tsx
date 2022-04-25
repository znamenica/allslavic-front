import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Chip, List, ListItem, ListItemAvatar, ListItemText, Pagination} from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import LyricsIcon from '@mui/icons-material/Lyrics';
import FeedIcon from '@mui/icons-material/Feed';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import {currentPageItemsSelector, getLibraryItems, setPage, totalPageSelector} from "../../store/library";
import {LibraryType} from "../../api/library";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

const StoryAvatar = ({ value }: { value: LibraryType }) => {
    switch (value) {
        case LibraryType.PROSE:
            return <AutoStoriesIcon />;
        case LibraryType.POEM:
            return <LyricsIcon />;
        case LibraryType.ARTICLE:
            return <ScienceIcon />;
        case LibraryType.NEWS:
            return <FeedIcon />;
        case LibraryType.STUDYING:
            return <SchoolIcon />;
        default:
            return null;
    }
};

const Library = () => {
    const [itemTypes, setItemTypes] = useState<LibraryType[]>([]);
    const navigate = useNavigate();
    const items = useAppSelector(currentPageItemsSelector);
    const totalPage = useAppSelector(totalPageSelector);
    const dispatch = useAppDispatch();
    const onChipClick = (item: LibraryType) => {
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
    useEffect(() => {
        dispatch(getLibraryItems({ type: itemTypes }));
    }, [dispatch, itemTypes ]);
    const getOutlined = (value: LibraryType) => itemTypes.includes(value) ? "filled" : "outlined";
    return (
        <Box>
            <Helmet>
                <title>Библиотека переводов</title>
                <meta name="Библиотека переводов" content="Тексты на межславянском языке" />
            </Helmet>
            <Typography variant="h3" gutterBottom component="div">
                Библиотека переводов
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: 1, marginBottom: 1, }}>
                <Typography variant="subtitle1">
                    Категории
                </Typography>
                <Chip
                    label="Стихи"
                    variant={getOutlined(LibraryType.POEM)}
                    onClick={() => onChipClick(LibraryType.POEM)}
                />
                <Chip
                    label="Проза"
                    variant={getOutlined(LibraryType.PROSE)}
                    onClick={() => onChipClick(LibraryType.PROSE)}
                />
                <Chip
                    label="Статьи"
                    variant={getOutlined(LibraryType.ARTICLE)}
                    onClick={() => onChipClick(LibraryType.ARTICLE)}
                />
                <Chip
                    label="Новости"
                    variant={getOutlined(LibraryType.NEWS)}
                    onClick={() => onChipClick(LibraryType.NEWS)}
                />
                <Chip
                    label="Обучение"
                    variant={getOutlined(LibraryType.STUDYING)}
                    onClick={() => onChipClick(LibraryType.STUDYING)}
                />
            </Box>
            <Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {items.map(item => (
                        <ListItem
                            alignItems="flex-start"
                            key={item.id}
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/library/${item.id}`)}
                        >
                            <ListItemAvatar>
                                <StoryAvatar value={item.type} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <React.Fragment>
                                        {item.value.slice(0, 200)}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>))}
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

export default Library;
