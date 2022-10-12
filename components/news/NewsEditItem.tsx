import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import TextEditor from "../ui/TextEditorLoader";
import {useTranslation} from "next-i18next";
import {useAppSelector} from "../../hooks";

const NewsEditItem = ({
    name,
    setName,
    content,
    setContent,
    description,
    setDescription,
    cover,
    setCover,
    category,
    setCategory,
    onSubmit,
}) => {
    const {t} = useTranslation();
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
                  defaultContent={content}
              />
              <Button
                  variant="outlined"
                  onClick={onSubmit}
                  sx={{ width: 'fit-content' }}
              >
                  {t('send')}
              </Button>
          </Box>
      </Container>
  )
};

export default NewsEditItem;
