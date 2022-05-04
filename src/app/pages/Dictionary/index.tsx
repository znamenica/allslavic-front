import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, ImageList, ImageListItem} from "@mui/material";
import animalsIcon from "../../assets/images/animals.jpeg";
import bodyPartsIcon from "../../assets/images/body-parts.jpeg";
import emotionsIcon from "../../assets/images/emotions.jpeg";
import housePartsIcon from "../../assets/images/house-parts.jpeg";
import vegetablesIcon from "../../assets/images/vegetables.jpeg";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import {forwardRef, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Toolbar from "@mui/material/Toolbar";

const itemData = [
    {img: animalsIcon, title: "animals"},
    {img: bodyPartsIcon, title: "body parts"},
    {img: emotionsIcon, title: "emotions"},
    {img: housePartsIcon, title: "house parts"},
    {img: vegetablesIcon, title: "vegetables"},
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
                        <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
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
                        <img style={{ backgroundSize: "contain", maxHeight: "inherit" }} alt={img.title} src={img.img} />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default Dictionary;
