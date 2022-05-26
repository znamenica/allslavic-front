import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {getLibraryItem} from "../../store/reducers/library";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {commonTranscribe} from "../../utils/transcribers";
import {Preferences} from "../../lib/constants";
import Head from "next/head";
import {useRouter} from "next/router";
import {AppState} from "../../store";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../hooks";
import {LibraryItem} from "../api/library";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const LibraryItem = () => {
    const [transcription, setTranscription] = useState<string|null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const item = useSelector<AppState, LibraryItem|null>(store => store.library.item);
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
                <title>Библиотека переводов</title>
                <meta name="Библиотека переводов" content="Тексты на межславянском языке" />
            </Head>
            <Typography
                variant="body2"
                gutterBottom
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => router.push("/library")}
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
                Загрузка
            </Typography>
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default LibraryItem;
