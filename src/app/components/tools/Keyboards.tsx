import Typography from "@mui/material/Typography";
import {Paper, Stack, styled} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import winKeyboard from "../../assets/sources/keyboards/ms.7z";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Keyboards = () => {
    const onWindowsDownload = () => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = winKeyboard;
        a.download = 'ms.7z'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
  return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" gutterBottom component="div">
              Скачать клавиатуру под межславянский язык
          </Typography>
          <Stack direction="row" spacing={2}>
              <Item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                      Windows
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                      (Windows 10, Windows 11)
                  </Typography>
                  <Button variant="text" onClick={onWindowsDownload}>Скачать</Button>
              </Item>
              <Item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                      MAC OS
                  </Typography>
                  <Button disabled variant="text">Скачать</Button>
              </Item>
              <Item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                      Linux
                  </Typography>
                  <Button disabled variant="text">Скачать</Button>
              </Item>
          </Stack>
      </Box>
  );
};

export default Keyboards;
