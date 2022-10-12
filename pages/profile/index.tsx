import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {Preferences} from "../../lib/constants";
import {ORTHOGRAPHY} from "../../utils/transcribers";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Profile = () => {
    const [transcription, setTranscription] = useState<string|null>(null);
    const {t} = useTranslation('common');

    const onTranscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setTranscription(val);
        localStorage.setItem(Preferences.transcription, val);
    };

    useEffect(() => {
        const transcription = localStorage.getItem(Preferences.transcription);
        if (transcription) {
            setTranscription(transcription);
        }
    }, []);
    return (
        <Box>
            <Head>
                <title>{t('profile_full')}</title>
                <meta name="description" content={t('profile_full_desc')} />
            </Head>
            <Typography variant="h3" gutterBottom component="div">
                {t('profile')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                {t('cash_settings')}
            </Typography>
            <FormControl>
                <FormLabel id="transcription-buttons-group-label">
                    {t('orthography_setting')}
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="transcription-buttons-group-label"
                    name="transcription-buttons-group"
                    value={transcription}
                    onChange={onTranscriptionChange}
                >
                    <FormControlLabel
                        value={ORTHOGRAPHY.CYR}
                        control={<Radio />}
                        label={t('simple_cyr')}
                    />
                    <FormControlLabel
                        value={ORTHOGRAPHY.CYR_SCI}
                        control={<Radio />}
                        label={t('sci_cyr')}
                    />
                    <FormControlLabel
                        value={ORTHOGRAPHY.CYR_PHON}
                        control={<Radio />}
                        label={t('phon_cyr')}
                    />
                    <FormControlLabel
                        value={ORTHOGRAPHY.LAT}
                        control={<Radio />}
                        label={t('simple_lat')}
                    />
                    <FormControlLabel
                        value={ORTHOGRAPHY.LAT_PHON}
                        control={<Radio />}
                        label={t('phon_lat')}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default Profile;
