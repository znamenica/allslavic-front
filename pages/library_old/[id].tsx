import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {getLibraryItem} from "../../store/reducers/library_old";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {commonTranscribe} from "../../utils/transcribers";
import {Preferences} from "../../lib/constants";
import Head from "next/head";
import {useRouter} from "next/router";
import {useAppDispatch} from "../../hooks";
import {library} from "../api/library";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import Api from "../api";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {LibraryItem} from "../api/library";

const LibraryItem = () => {
    const [transcription, setTranscription] = useState<string|null>(null);
    const router = useRouter();
    const {t } = useTranslation('common');
    const dispatch = useAppDispatch();
    const item = useSelector<AppState, LibraryItem|null>(store => store.library_old.item);
    useEffect(() => {
        if (router.query.id) {
            dispatch(getLibraryItem(parseInt(router.query.id as string)));
        }
    }, [router.query.id]);
    useEffect(() => {
        setTranscription(localStorage.getItem(Preferences.transcription));
    }, []);
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
                onClick={() => router.push("/library_old")}
            >
                <ArrowBackIcon/>
            </Typography>
            <Typography variant="h3" gutterBottom component="div">
                {transcription
                    ? commonTranscribe(item.title, transcription)
                    : item.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="div" sx={{ whiteSpace: "pre-wrap" }}>
                {transcription
                    ? commonTranscribe(item.value, transcription)
                    : item.value}
            </Typography>
        </Box>
    ) : (
        <Box>
            <Typography variant="h3" gutterBottom component="div">
                {t('loading')}
            </Typography>
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export async function getStaticPaths({ params }) {
    return {
        paths: library.map(e => ({ params: { id: e.id.toString() }})),
        fallback: true,
    }
}

export default LibraryItem;
