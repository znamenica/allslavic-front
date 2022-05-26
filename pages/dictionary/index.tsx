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

const itemData = [
    {img: '/images/animals.jpeg', title: "animals"},
    {img: '/body-parts.jpeg', title: "body parts"},
    {img: '/images/emotions.jpeg', title: "emotions"},
    {img: '/images/house-parts.jpeg', title: "house parts"},
    {img: '/images/vegetables.jpeg', title: "vegetables"},
    {img: '/images/dishes.png', title: "dishes"},
    {img: '/images/mebel.png', title: "mebel"},
    {img: '/images/transport.png', title: "transport"},
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
    return (
        <Box>
            <Typography variant="h5">
                Раздел находится в разработке
            </Typography>
            <Typography variant="subtitle1">
                Пока можете ознакомиться с некоторыми визуальными материалами
            </Typography>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img} onClick={() => onItemClick(item)}>
                        <Image
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
                <Box style={{ maxHeight: 'calc(100% - 60px)' }}>
                    {img && (
                        <Image
                            style={{ backgroundSize: "contain", maxHeight: "inherit" }}
                            alt={img.title}
                            src={img.img}
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
