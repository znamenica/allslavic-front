import React from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {transcribe} from "../../utils/transcribers";

const Tools = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [result, setResult] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const onTranscribe = () => {
        setResult(value.split("").map(e => transcribe(e)).join(""));
    };
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h3" gutterBottom component="div">
                    {t('tools')}
                </Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h5" gutterBottom component="div">
                        {t('transcriber-cyrillic')}
                    </Typography>
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
                </Box>
            </div>
        </div>
    );
};

export default Tools;
