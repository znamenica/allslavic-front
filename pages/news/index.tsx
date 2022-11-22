import Head from "next/head";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {Box, Button, Chip} from "@mui/material";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getNewsItems, setPage} from "../../store/reducers/news";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useRouter} from "next/router";
import NewsItem from "../../components/news/NewsItem";
import {NewsTag} from "../api/news";
import {getTagsItems} from "../../store/reducers/tags";

const News = () => {
    const dispatch = useAppDispatch();
    const [itemTypes, setItemTypes] = useState([]);
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const news = useAppSelector(state => state.news.items);
    const page = useAppSelector(state => state.news.page);
    const loadAll = useAppSelector(state => state.news.loadAll);
    const tagsLoading = useAppSelector(state => state.tags.loading);
    const { t } = useTranslation('common');
    const router = useRouter();
    const onAdd = () => {
      router.push('/news/add');
    };

    const onLoadMore = () => {
        const token = localStorage.getItem("access_token");
        dispatch(setPage(page + 1));
        dispatch(getNewsItems(itemTypes, token));
    };
    const getOutlined = (value: NewsTag) => itemTypes.includes(value) ? "filled" : "outlined";
    const onChipClick = (item: NewsTag) => {
        if (itemTypes.includes(item)) {
            const items = [...itemTypes].filter(e => e !== item);
            setItemTypes(items);
        } else {
            const items = [...itemTypes];
            items.push(item);
            setItemTypes(items);
        }
    };

    useEffect(() => {
        dispatch(getTagsItems());
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        dispatch(setPage(0));
        if (itemTypes.length > 0 || router.isReady && !router.query.hasOwnProperty('kolozor')) {
            dispatch(getNewsItems(itemTypes, token));
        }
    }, [dispatch, itemTypes]);

    useEffect(() => {
        if (router.query.hasOwnProperty('kolozor') && !tagsLoading) {
            router.replace("/news");
            onChipClick(NewsTag.KOLOZOR);
        }
    }, [dispatch, tagsLoading, router.query]);
    return (
        <Box
            sx={{ marginTop: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}
        >
            <Head>
                <title>{t('news_pl')}</title>
                <meta name="description" content={t('news_desc')} />
            </Head>
            <Typography variant="h3" gutterBottom component="div">
                {t('news_pl')}
            </Typography>
            {isLoggedIn && (
                <Box>
                    <Button variant="contained" onClick={onAdd}>{t('add')}</Button>
                </Box>
            )}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: 1, marginBottom: 1, }}>
                <Typography variant="subtitle1">
                    {t('categories')}
                </Typography>
                <Chip
                    label={t('society')}
                    variant={getOutlined(NewsTag.SOCIETY)}
                    onClick={() => onChipClick(NewsTag.SOCIETY)}
                />
                <Chip
                    label={t('science')}
                    variant={getOutlined(NewsTag.SCIENCE)}
                    onClick={() => onChipClick(NewsTag.SCIENCE)}
                />
                <Chip
                    label={t('kolozor')}
                    variant={getOutlined(NewsTag.KOLOZOR)}
                    onClick={() => onChipClick(NewsTag.KOLOZOR)}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
                {news?.map(item => (
                    <NewsItem key={item.id} item={item} />
                ))}
            </Box>
            {!loadAll && (
                <Box sx={{ display: 'flex', marginTop: 5 }}>
                    <Button
                        onClick={onLoadMore}
                        variant="outlined"
                    >
                        Загрузить еще
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default News;
