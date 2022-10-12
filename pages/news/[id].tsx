import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Api from "../api";
import Box from "@mui/material/Box";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useAppSelector} from "../../hooks";
import {Button, CardMedia} from "@mui/material";

const NewsItem = ({ item }) => {
    const router = useRouter();
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const { t} = useTranslation();
    const onEdit = () => {
      router.push(`/news/${item.id}/edit`);
    };
    return item ? (
        <Box sx={{ marginTop: 1 }}>
            <Head>
                <title>{t('library')}</title>
                <meta name="description" content={t('library_desc')} />
            </Head>
            <Typography
                variant="body2"
                gutterBottom
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push("/news")}
            >
                <ArrowBackIcon/>
            </Typography>
            <Typography variant="h3" gutterBottom component="div">
                {item.title}
            </Typography>
            {isLoggedIn && (
                <Box>
                    <Button variant="contained" onClick={onEdit}>{t('edit')}</Button>
                </Box>
            )}
            <Box sx={{ width: 200, marginTop: 1 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={item.cover_uri}
                />
            </Box>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
        </Box>
    ) : (
        <Box>
            <Typography variant="h3" gutterBottom component="div">
                {t('loading')}
            </Typography>
        </Box>
    );
};

export const getStaticProps = async ({ locale, params }) => {
    const {item} = await Api.news.getById(params.id);
    return ({
        props: {
            item,
            ...await serverSideTranslations(locale, ['common']),
        },
    });
}

export const getStaticPaths = () => {
  return {
      paths: [],
      fallback: true,
  }
};

export default NewsItem;
