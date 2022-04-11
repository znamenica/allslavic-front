import React from "react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom component="div">
            {t('logo')}
          </Typography>
            <Typography variant="body1" gutterBottom component="div">
                Межславянский портал предоставляет ресурсы, посвященные межславянскому языку. В данный момент основные разделы разрабатываются.
            </Typography>
        </div>
      </div>
    );
};

export default Home;
