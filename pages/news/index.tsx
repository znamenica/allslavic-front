import Head from "next/head";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {Box, Button} from "@mui/material";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getNewsItems, setPage} from "../../store/reducers/news";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useRouter} from "next/router";
import NewsItem from "../../components/news/NewsItem";
import Api from "../api";

const News = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const news = useAppSelector(state => state.news.items);
    const page = useAppSelector(state => state.news.page);
    const loadAll = useAppSelector(state => state.news.loadAll);
    const { t } = useTranslation('common');
    const router = useRouter();
    const onAdd = () => {
      router.push('/news/add');
    };

    const onLoadMore = () => {
        dispatch(setPage(page + 1));
        dispatch(getNewsItems());
    };

    useEffect(() => {
        dispatch(getNewsItems());

        const token = localStorage.getItem("access_token");
        Api.tags.getAll(token).then(res => {
            console.log(res);
        })
    }, [dispatch]);
    return (
        <Box
            sx={{ marginTop: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}
        >
            <Head>
                <title>{t('news')}</title>
                <meta name="description" content={t('news_desc')} />
            </Head>
            <Typography variant="h3" gutterBottom component="div">
                {t('news')}
            </Typography>
            {isLoggedIn && (
                <Box>
                    <Button variant="contained" onClick={onAdd}>{t('add')}</Button>
                </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
                {news?.map(item => (
                    <NewsItem item={item} />
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
