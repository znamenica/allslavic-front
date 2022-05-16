import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {InputLabel, Select, SelectChangeEvent, Tab, Tabs, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {commonTranscribe, ORTHOGRAPHY} from "../../../utils/transcribers";
import {Helmet} from "react-helmet";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {useSearchParams} from "react-router-dom";
import Keyboards from "../../components/tools/Keyboards";

const parts = [{ key: 0, value: "transcriber"}, {key: 1, value: "keyboards"}];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Tools = () => {
    const { t } = useTranslation();
    const [tType, setTType] = useState(ORTHOGRAPHY.CYR);
    const [value, setValue] = useState('');
    const [result, setResult] = useState("");
    const [tab, setTab] = useState(0);
    const [search, setSearch] = useSearchParams();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
        setSearch({ part: newValue.toString() });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleTypeChange = (event: SelectChangeEvent<ORTHOGRAPHY>) => {
        setTType(event.target.value as ORTHOGRAPHY);
    };
    const onTranscribe = () => {
        const res = commonTranscribe(value, tType.toString());
        setResult(res);
    };
    useEffect(() => {
        const elem = parts.find(e => e.key.toString() === search.get("part"));
        if (elem) {
            setTab(elem.key);
        }
    }, [search]);
    return (
        <Box>
            <Helmet>
                <title>Транскрибатор межславянского языка</title>
                <meta name="Транскрибатор межславянского языка" content="Перевод с кириллицы на латиницу межславянского языка" />
            </Helmet>
            <Typography variant="h3" gutterBottom component="div">
                {t('tools')}
            </Typography>
            <Box sx={{ marginTop: 10, flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tab}
                    onChange={handleTabChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {parts.map(part => (
                        <Tab key={part.key} label={t(part.value)} {...a11yProps(part.key)} />
                    ))}
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Typography>
                        {t('transcriber-cyrillic')}
                    </Typography>
                    <FormControl sx={{ marginBottom: 2 }}>
                        <InputLabel id="tType-select-label">Перевести в</InputLabel>
                        <Select
                            labelId="tType-select-label"
                            id="tType-select"
                            value={tType}
                            label="Перевести в"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={ORTHOGRAPHY.CYR}>Проста кирилица</MenuItem>
                            <MenuItem value={ORTHOGRAPHY.CYR_SCI}>Научна кирилица</MenuItem>
                            <MenuItem value={ORTHOGRAPHY.LAT}>Prosta latinica</MenuItem>
                            <MenuItem value={ORTHOGRAPHY.LAT_PHON}>Fonetična latinica</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex', flexDirection: "column", maxWidth: '500px' }}>
                        <TextField
                            id="transcribe-textarea"
                            label={t('enter-text')}
                            multiline
                            value={value}
                            minRows={5}
                            onChange={handleChange}
                        />
                        <Button
                            variant="text"
                            sx={{ alignSelf: "start", marginTop: 10, marginBottom: 2 }}
                            onClick={onTranscribe}
                        >
                            {t('transcribe')}
                        </Button>
                        <TextField
                            id="transcribe-result"
                            disabled
                            label={t('result')}
                            multiline
                            value={result}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Typography>
                        {t('keyboards')}
                    </Typography>
                    <Keyboards />
                </TabPanel>
            </Box>
        </Box>
    );
};

export default Tools;
