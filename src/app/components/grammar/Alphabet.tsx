import React, {memo} from "react";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import sounds from '../../assets/audio/alphabet';
import {useMultiAudio} from "../../hooks";
import {ORTHOGRAPHY} from "../../utils/transcribers";
import {Preferences} from "../../common/constants";
import Box from "@mui/material/Box";

const rows: any[] = [
    { value: 'а', latin: 'a', audio: 'a', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON] },
    { value: 'б', latin: 'b', audio: 'b', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'в', latin: 'v', audio: 'v', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'г', latin: 'g', audio: 'g', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'д', latin: 'd', audio: 'd', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'е', latin: 'e', audio: 'e', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ѧ', latin: 'ȩ', audio: 'en', alphabets: [ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ѣ', latin: 'ě', audio: 'jat', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ж', latin: 'ž', audio: 'zh', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'з', latin: 'z', audio: 'z', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'и', latin: 'i', audio: 'i', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'і', latin: 'j', audio: 'j', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'к', latin: 'k', audio: 'k', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'л', latin: 'l', audio: 'l', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'м', latin: 'm', audio: 'm', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'н', latin: 'n', audio: 'p', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'о', latin: 'o', audio: 'o', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'п', latin: 'p', audio: 'p', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'р', latin: 'r', audio: 'r', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'с', latin: 's', audio: 's', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'т', latin: 't', audio: 't', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'у', latin: 'u', audio: 'u', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ѫ', latin: 'ų', audio: 'un', alphabets: [ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ф', latin: 'f', audio: 'f', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'х', latin: 'h', audio: 'h', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ц', latin: 'c', audio: 'c', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON] },
    { value: 'ч', latin: 'č', audio: 'ch', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ш', latin: 'š', audio: 'sh', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'щ', latin: 'šč', audio: 'shch', alphabets: [ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ъ', latin: '-', audio: 'er', alphabets: [ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT_PHON]  },
    { value: 'ы', latin: 'y', audio: 'y', alphabets: [ORTHOGRAPHY.CYR, ORTHOGRAPHY.CYR_SCI, ORTHOGRAPHY.CYR_PHON, ORTHOGRAPHY.LAT, ORTHOGRAPHY.LAT_PHON]  },
];

const Alphabet = memo(() => {
    const urls = rows.map(f => f.audio && sounds[f.audio] ? { key: f.audio, url: sounds[f.audio] } : null);
    const validUrls = urls.filter(e => !!e) as Array<{ key: string, url: string }>;
    const transcription = localStorage.getItem(Preferences.transcription);
    const [players, toggle] = useMultiAudio(validUrls);
    console.log(players);
    return (
        <div style={{ display: 'grid', gap: '10px', gridTemplate: 'repeat(5, 1fr) / repeat(5, 1fr)' }}>
            {rows
                .filter(e => transcription ? e.alphabets?.includes(parseInt(transcription, 10)) : true)
                .map((elem, index) => (
                    <Box key={elem.value}>
                        <Card sx={{ minWidth: 10 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {elem.value.toUpperCase()} {elem.value}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {elem.latin !== '-' ? `${elem.latin.toUpperCase()} ${elem.latin}` : elem.latin}
                                </Typography>
                                {elem.audio && players.find(e => e.key === elem.audio)
                                    ? players.find(e => e.key === elem.audio).playing
                                        ? <PauseIcon onClick={toggle(elem.audio)} />
                                        : <PlayArrowIcon onClick={toggle(elem.audio)} />
                                    : null}
                            </CardContent>
                        </Card>
                    </Box>
            ))}
        </div>
    );
});

export default Alphabet;
