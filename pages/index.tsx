import Head from 'next/head'
import { GetStaticProps } from 'next'
import React from "react";
import {useTranslation} from "next-i18next";
import Typography from '@mui/material/Typography';
import {List, ListItem, ListItemText} from "@mui/material";
import Keyboards from "../components/tools/Keyboards";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Home({}) {
    const { t } = useTranslation('common');
    const desc = t('logo_desc');
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Head>
                <meta name="robots" content="all" />
                <title>{t('logo')}</title>
                <meta name="description" content={desc} />
            </Head>
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h3" gutterBottom component="div">
                    {t('logo')}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                    {desc}
                </Typography>
                <Typography variant="body1">
                    {t('interslavic_goals')}
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={t('simple_studying')}
                            secondary={t('simple_studying_desc')}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={t('easy_understand')}
                            secondary={t('easy_understand_desc')}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={t('international_communication')}
                            secondary={t('international_communication_desc')}
                        />
                    </ListItem>
                </List>
                <Keyboards />
            </div>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})