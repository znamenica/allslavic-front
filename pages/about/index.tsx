import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Head from "next/head";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const About = () => {
    const {t} = useTranslation('common');
  return (
      <Box>
          <Head>
              <title>{t('about')}</title>
              <meta name="description" content={t('about_desc')} />
          </Head>
          <Typography variant="h3" gutterBottom component="div">
              О портале
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.3 (12.10.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Добавлена авторизация<br/>
              - Добавлена страница авторизированного пользователя
              - Добавлен раздел новостей
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.2.2 (08.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Добавлена обратная связь<br/>
              - Исправлено отображение отдельного визуального материала
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.2.1 (07.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Исправлены ошибки переноса<br/>
              - Переработан блок с визуальными материалами
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.2.0 (26.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Переработан движок портала на Next.js<br/>
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.1.1 (24.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Попытка наладить работу интернационализации сайта с помощью стриминга на React 18
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.1.0 (20.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Переработан движок портала для работы SEO<br/>
              - Добавлен серверный рендеринг мета-тегов для работы в поисковиках<br/>
              - Логика работы приложения изменена минимально
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.0.4 (13.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Добавлена клавиатура мс для виндовс<br/>
              - Добавлен выбор целевой азбуки при использовании транскрибатора
              - В инструменты вынесено скачивание клавиатуры
              - Исправлены ошибки в аудио-таблице азбуки
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
              Версия 0.0.3 (10.05.2022)
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
              - Добавлены аудио-файлы для прослушивания в разделе азбуки грамматики<br/>
              - Добавлены некоторые фото-материалы в раздел словаря
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

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default About;
