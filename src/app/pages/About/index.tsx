import Box from "@mui/material/Box";
import {Helmet} from "react-helmet";
import Typography from "@mui/material/Typography";
import React from "react";

const About = () => {
  return (
      <Box>
          <Helmet>
              <title>О портале</title>
              <meta name="О портале" content="Информация о портале" />
          </Helmet>
          <Typography variant="h3" gutterBottom component="div">
              О портале
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.0.2 (04.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Добавлен выбор варианта правописания (простой, научный, фонетический для кириллицы и простой, фонетический для латиницы)<br/>
              - Кеширование выбранных настроек в профиле браузера
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.0.1 (25.04.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Транскрибатор с кириллицы на латиницу<br/>
              - Библиотека переводов<br/>
              - Поддержка английского и русского языков
          </Typography>
      </Box>
  );
};

export default About;
