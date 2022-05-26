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
    const desc = "Межславянский портал предоставляет ресурсы, посвященные межславянскому языку. В данный момент основные разделы разрабатываются.";
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Head>
                <title>{t('logo')}</title>
                <meta name={t('logo')} content={desc} />
            </Head>
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h3" gutterBottom component="div">
                    {t('logo')}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                    {desc}
                </Typography>
                <Typography variant="body1">
                    Цели межславянского языка:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Простота изучения"
                            secondary="Возможность для славяноязычных людей не учить, а доучивать язык"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Легкость понимания"
                            secondary="Возможность облегчения понимания природных славянских языков как современных, так и исторических, для славяноязычных, так и для инозычных"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Международное общение"
                            secondary="Возможность использования как языка международного общения, как между славянами, так и не славяноязычными, для различного рода целей влючая: туризм, бизнес, бытовое и попредметное общение, церковную тематику
"
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