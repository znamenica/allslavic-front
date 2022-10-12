import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {useState} from "react";
import TextEditor from "../../components/ui/TextEditorLoader";
import Error from "next/error";
import {useAppSelector} from "../../hooks";
import Api from "../api";
import {useRouter} from "next/router";

const Add = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const myId = useAppSelector(state => state.me.item?.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover, setCover] = useState("");
    const [content, setContent] = useState("");
    const {t} = useTranslation();
    const router = useRouter();
    const handlerCoverChange = (e) => {
        setCover(e?.target?.value);
    }
    const handlerNameChange = (e) => {
        setName(e?.target?.value);
    };
    const handlerDescChange = (e) => {
      setDescription(e?.target?.value);
    };
    const handlerCategoryChange = (e) => {
        setCategory(e?.target?.value);
    };
    const onSendNews = () => {
        const token = localStorage.getItem("access_token");
        Api.news.create({
            title: name, text: content, author_id: myId, abstract: description, cover_uri: cover,
        }, token).then(() => {
            router.push('/news');
        });
    };

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    return (
        <Container>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant="h3">
                    {t('add_news')}
                </Typography>
                <TextField
                    id="outlined-name"
                    label={t('name')}
                    sx={{ width: 300 }}
                    variant="outlined"
                    value={name}
                    onChange={handlerNameChange}
                />
                <TextField
                    multiline
                    id="outlined-desc"
                    label={t('description')}
                    variant="outlined"
                    value={description}
                    onChange={handlerDescChange}
                />
                <TextField
                    id="outlined-cover"
                    label={t('cover')}
                    sx={{ width: 300 }}
                    variant="outlined"
                    value={cover}
                    onChange={handlerCoverChange}
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={category}
                        label="Category"
                        onChange={handlerCategoryChange}
                    >
                        <MenuItem value="">
                            <em>-</em>
                        </MenuItem>
                        <MenuItem value="ms_krug">
                            <strong>Межсловѣнскы крѫг</strong>
                        </MenuItem>
                        <MenuItem value="science">Наука</MenuItem>
                        <MenuItem value="society">Общество</MenuItem>
                    </Select>
                </FormControl>
                <TextEditor
                    onChange={setContent}
                    defaultContent=""
                />
                <Button
                    variant="outlined"
                    onClick={onSendNews}
                    sx={{ width: 'fit-content' }}
                >
                    {t('send')}
                </Button>
            </Box>
        </Container>
    )
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Add;
