import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, ImageList, ImageListItem} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

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

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Dictionary = () => {
    const [open, setOpen] = useState(false);
    const {t} = useTranslation('common');
    const [img, setImg] = useState<{img: string, title: string }|null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImg(null);
    };
    const onItemClick = (image: { img: string, title: string }) => {
        setImg(image);
        handleClickOpen();
    };
    console.log(img);
    return (
        <Box>
            <Typography variant="h5">
                {t('page_in_progress')}
            </Typography>
            <Typography variant="subtitle1">
                {t('page_in_progress_desc')}
            </Typography>
            <ImageList sx={{ width: '100%', height: 500 }} cols={5} rowHeight={200}>
                {itemData.map((item) => (
                    <ImageListItem sx={{ position: 'relative', width: 200, height: 200 }} key={item.img} onClick={() => onItemClick(item)}>
                        <Image
                            src={item.img}
                            alt={item.title}
                            layout='fill'
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {img?.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box style={{ maxHeight: 'calc(100% - 60px)', position: "relative", width: '100%', height: '100%' }}>
                    {img && (
                        <Image
                            alt={img.title}
                            src={img.img}
                            objectFit="scale-down"
                            layout='fill'
                        />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default Dictionary;
