import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {NewsItem} from "../../pages/api/news";
import {useTranslation} from "next-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import Api from "../../pages/api";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getNewsItems} from "../../store/reducers/news";
import {useRouter} from "next/router";

const NewsItem = ({ item }: { item: NewsItem }) => {
    const { t } = useTranslation();
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handlerDelete = () => {
        const token = localStorage.getItem("access_token");
        Api.news.deleteById(item.id, token);
        dispatch(getNewsItems([], token));
    };
    const handlerEdit = () => {
      router.push(`/news/${item.id}/edit`);
    };
    const goToItem = () => {
        router.push(`/news/${item.id}`);
    };
    return (
        <Box
          sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
        >
            <Card sx={{ maxWidth: 350, minWidth: 350, marginTop: 4 }} onClick={goToItem}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="194"
                        image={item.cover_uri}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div">
                            {item.abstract}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {t('read_all')}
                    </Button>
                </CardActions>
            </Card>
            {isLoggedIn && (
                <EditIcon
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        right: '40px',
                        cursor: "pointer"
                    }}
                    onClick={handlerEdit}
                />
            )}
            {isLoggedIn && (
                <DeleteIcon
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        right: '10px',
                        cursor: "pointer"
                    }}
                    onClick={handlerDelete}
                />
            )}
        </Box>
    );
};

export default NewsItem;
