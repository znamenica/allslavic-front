import React from "react";
import TableContainer from "@mui/material/TableContainer";
import {Card, CardContent, Paper, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";

const audios = require('../../assets/audio/alphabet');

const rows: any[][] = [
    [{ value: 'а', latin: 'a' }, { value: 'б', latin: 'b' },{ value: 'в', latin: 'v' },{ value: 'г', latin: 'g' },{ value: 'д', latin: 'd' }],
    [{ value: 'е', latin: 'e' }, { value: 'ѧ', latin: 'ȩ' },{ value: 'ѣ', latin: 'ě' },{ value: 'ж', latin: 'ž' }, { value: 'з', latin: 'z' },],
    [{ value: 'и', latin: 'i' }, { value: 'і', latin: 'j' },{ value: 'к', latin: 'k' },{ value: 'л', latin: 'l' }, { value: 'м', latin: 'm' },],
    [{ value: 'н', latin: 'n' }, { value: 'о', latin: 'o' },{ value: 'п', latin: 'p' },{ value: 'р', latin: 'r' }, { value: 'с', latin: 's' },],
    [{ value: 'т', latin: 't' }, { value: 'у', latin: 'u' },{ value: 'ѫ', latin: 'ų' },{ value: 'ф', latin: 'f' }, { value: 'х', latin: 'h' },],
    [{ value: 'ц', latin: 'c' }, { value: 'ч', latin: 'č' },{ value: 'ш', latin: 'š' },{ value: 'щ', latin: 'šč' }, { value: 'ъ', latin: '-' },],
    [{ value: 'ы', latin: 'y', audio: 'y' }],
];

const Alphabet = () => {
    console.log(audios);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map(elem => (
                                <TableCell key={elem.value}>
                                    <Card sx={{ minWidth: 10 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {elem.value.toUpperCase()} {elem.value}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {elem.latin !== '-' ? `${elem.latin.toUpperCase()} ${elem.latin}` : elem.latin}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Alphabet;
