import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {getLibraryItem} from "../../store/library";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LibraryItem = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const item = useAppSelector(store => store.library.item);
    useEffect(() => {
        if (params.id) {
            dispatch(getLibraryItem(parseInt(params.id)));
        }
    }, [dispatch, params]);
    return item ? (
        <Box sx={{ marginTop: 1 }}>
            <Typography
                variant="body2"
                gutterBottom
                component="div"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/library")}
            >
                <ArrowBackIcon/>
            </Typography>
            <Typography variant="h3" gutterBottom component="div">
                {item.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="div" sx={{ whiteSpace: "pre-wrap" }}>
                {item.value}
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

export default LibraryItem;
