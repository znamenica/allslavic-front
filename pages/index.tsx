import Head from 'next/head'
import React, {useMemo} from "react";
import {useTranslation} from "next-i18next";
import Typography from '@mui/material/Typography';
import {Box, ImageList, ImageListItem, List, ListItem, ListItemText} from "@mui/material";
import Keyboards from "../components/tools/Keyboards";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Image from "next/image";

const itemData = [
    {img: '/images/animals.jpeg', title: "animals"},
    {img: '/images/animals_2.jpeg', title: "animals"},
    {img: '/images/animals_3.jpeg', title: "animals"},
    {img: '/images/body_parts.jpeg', title: "body parts"},
    {img: '/images/buildings.jpeg', title: "buildings"},
    {img: '/images/clothes.jpeg', title: "clothes"},
    {img: '/images/colors.jpeg', title: "colors"},
    {img: '/images/devices.jpeg', title: "devices"},
    {img: '/images/dishes.png', title: "dishes"},
    {img: '/images/dishes.jpeg', title: "dishes"},
    {img: '/images/drinks.png', title: "drinks"},
    {img: '/images/eating.png', title: "eating"},
    {img: '/images/eating_1.png', title: "eating"},
    {img: '/images/emotions.jpeg', title: "emotions"},
    {img: '/images/figures.jpeg', title: "figures"},
    {img: '/images/fruits.jpeg', title: "fruits"},
    {img: '/images/higiene.png', title: "higiene"},
    {img: '/images/house-parts.jpeg', title: "house parts"},
    {img: '/images/insects.jpeg', title: "insects"},
    {img: '/images/mebel.png', title: "mebel"},
    {img: '/images/medicine.jpeg', title: "jpeg"},
    {img: '/images/musical_instruments.jpeg', title: "musical instruments"},
    {img: '/images/professions.png', title: "professions"},
    {img: '/images/professions_2.jpeg', title: "professions"},
    {img: '/images/studying.jpeg', title: "studying"},
    {img: '/images/summer.jpeg', title: "summer"},
    {img: '/images/summer_2.png', title: "summer"},
    {img: '/images/transport.png', title: "transport"},
    {img: '/images/transport.jpeg', title: "transport"},
    {img: '/images/vegetables.jpeg', title: "vegetables"},
    {img: '/images/verbs.jpeg', title: "verbs"},
    {img: '/images/verbs_2.png', title: "verbs"},
    {img: '/images/verbs_3.jpeg', title: "verbs"},
    {img: '/images/weather.png', title: "weather"},
];

export default function Home({}) {
    const { t } = useTranslation('common');
    const desc = t('logo_desc');
    const item = useMemo(() => {
        const index = Math.round(Math.random() * (itemData.length - 1));
        return itemData[index];
    }, []);

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
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
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
                    </Box>
                    <Box sx={{ marginRight: '100px' }}>
                        <ImageList sx={{ width: '300px', height: '300px' }} cols={1}>
                            <ImageListItem sx={{ position: 'relative', width: '300px', height: '300px' }}>
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    layout='fill'
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </ImageList>
                    </Box>
                </Box>
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