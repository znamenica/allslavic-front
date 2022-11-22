import {Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import TagAddItem from "../../components/tags/TagAddItem";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {useTranslation} from "next-i18next";
import {getTagsItems, currentPageItemsSelector} from "../../store/reducers/tags";
import {useAppDispatch, useAppSelector} from "../../hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../api";

const TagListPage = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const items = useAppSelector(currentPageItemsSelector);

    const handlerDelete = (id) => {
        const token = localStorage.getItem("access_token");
        Api.tags.deleteById(id, token);
        dispatch(getTagsItems());
    };

    useEffect(() => {
        dispatch(getTagsItems());
    }, []);

    return (
        <Box
            sx={{ marginTop: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}
        >
            <Typography variant="h3" gutterBottom component="div">
                {t('manage_tags')}
            </Typography>
            <TagAddItem />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {items.map(item => (
                    <ListItem
                        alignItems="flex-start"
                        key={item.id}
                    >
                        <ListItemText
                            primary={item.titles && item.titles[0]?.text}
                            secondary={item.kind}
                        />
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
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default TagListPage;
