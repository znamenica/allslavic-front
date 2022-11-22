import {
    Box,
    Button, Chip,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import TextEditor from "../ui/TextEditorLoader";
import {useTranslation} from "next-i18next";
import {useMemo} from "react";
import {isNewsTag, newsCategoryTagList} from "../../utils/news";

const NewsEditItem = ({
    name,
    tags,
    tagIds,
    setTagIds,
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
    const onChangeTag = (tag) => {
      setTagIds([...tagIds, tag.id]);
    };
    const onDeleteTag = (tag) => {
      setTagIds(tagIds.filter(e => e !== tag.id));
    };
    const customTags = useMemo(() => {
        return tags.filter(e => !isNewsTag(e));
    }, [tags]);
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
                      {newsCategoryTagList().map(tagItem => (
                          <MenuItem value={tagItem}>
                              {t(tagItem)}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
              <TextEditor
                  onChange={setContent}
                  defaultContent={content}
              />
              <Stack direction="row" spacing={1}>
                  {customTags.map(tag => (
                      <Chip label={tag.titles[0]?.text}
                            color="primary"
                            variant={tagIds.includes(tag.id) ? undefined : "outlined"}
                            onClick={() => onChangeTag(tag)}
                            onDelete={tagIds.includes(tag.id) ? () => onDeleteTag(tag) : undefined}
                      />
                  ))}
              </Stack>
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
