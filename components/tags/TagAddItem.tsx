import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useTranslation} from "next-i18next";
import {useState} from "react";
import Api from "../../pages/api";
import {useAppDispatch} from "../../hooks";
import {getTagsItems} from "../../store/reducers/tags";

const TagAddItem = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const handlerNameChange = (e) => {
        setName(e?.target?.value);
    };
    const handlerCategoryChange = (e) => {
        setCategory(e?.target?.value);
    };
    const onAdd = () => {
        const token = localStorage.getItem("access_token");
        Api.tags.create({
            titles_attributes: [{text: name, alphabeth_id: 1, language_id: 1,}], kind: category
        }, token).then(() => {
            dispatch(getTagsItems());
        });
    };
    return (
        <Box>
            <TextField
                id="outlined-name"
                label={t('name')}
                sx={{ width: 300 }}
                variant="outlined"
                value={name}
                onChange={handlerNameChange}
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
                    <MenuItem value="librum">Библиотека</MenuItem>
                    <MenuItem value="language">Язык</MenuItem>
                    <MenuItem value="alphabeth">Алфавит</MenuItem>
                    <MenuItem value="dictionary">Словарь</MenuItem>
                    <MenuItem value="grammar">Грамматика</MenuItem>
                    <MenuItem value="article">Статья</MenuItem>
                    <MenuItem value="meaning">Значение</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={onAdd}>{t('add')}</Button>
        </Box>
    )
};

export default TagAddItem;
