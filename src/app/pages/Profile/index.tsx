import {Helmet} from "react-helmet";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {Preferences} from "../../common/constants";
import {ORTHOGRAPHY} from "../../utils/transcribers";

const Profile = () => {
    const [transcription, setTranscription] = useState<string|null>(null);

    const onTranscriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        setTranscription(val);
        localStorage.setItem(Preferences.transcription, val);
    };

    useEffect(() => {
        const transcription = localStorage.getItem(Preferences.transcription);
        if (transcription) {
            setTranscription(transcription);
        }
    }, []);
    return (
        <Box>
            <Helmet>
                <title>Профиль пользователя</title>
                <meta name="Профиль пользователя" content="Пользовательские настройки" />
            </Helmet>
            <Typography variant="h3" gutterBottom component="div">
                Профиль
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                Кешированные настройки для пользования сайтом. Все настройки привязаны к конкретному браузеру устройства.
            </Typography>
            <FormControl>
                <FormLabel id="transcription-buttons-group-label">Вариант правописания</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="transcription-buttons-group-label"
                    name="transcription-buttons-group"
                    value={transcription}
                    onChange={onTranscriptionChange}
                >
                    <FormControlLabel value={ORTHOGRAPHY.CYR} control={<Radio />} label="Проста кириллица" />
                    <FormControlLabel value={ORTHOGRAPHY.CYR_SCI} control={<Radio />} label="Научна кириллица" />
                    <FormControlLabel value={ORTHOGRAPHY.CYR_PHON} control={<Radio />} label="Фонетична кириллица" />
                    <FormControlLabel value={ORTHOGRAPHY.LAT} control={<Radio />} label="Latinica" />
                    <FormControlLabel value={ORTHOGRAPHY.LAT_PHON} control={<Radio />} label="Phonetična latinica" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default Profile;
