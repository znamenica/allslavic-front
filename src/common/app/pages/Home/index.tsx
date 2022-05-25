import React from "react";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemText} from "@mui/material";
import {Helmet} from "react-helmet";
import Keyboards from "../../components/tools/Keyboards";

const Home = () => {
    const { t } = useTranslation();
    const desc = "Межславянский портал предоставляет ресурсы, посвященные межславянскому языку. В данный момент основные разделы разрабатываются.";
    return (
      <div style={{ display: 'flex', height: '100%' }}>
          <Helmet
            title={t('logo')}
            meta={[
                { name: t('logo'), content: desc }
            ]}
          />
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h3" gutterBottom component="div">
            {t('logo')}
          </Typography>
            <Typography variant="body1" gutterBottom component="div">
                {desc}
            </Typography>
            <Typography variant="body1">
                Цели межславянского языка:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText
                        primary="Простота изучения"
                        secondary="Возможность для славяноязычных людей не учить, а доучивать язык"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Легкость понимания"
                        secondary="Возможность облегчения понимания природных славянских языков как современных, так и исторических, для славяноязычных, так и для инозычных"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Международное общение"
                        secondary="Возможность использования как языка международного общения, как между славянами, так и не славяноязычными, для различного рода целей влючая: туризм, бизнес, бытовое и попредметное общение, церковную тематику
"
                    />
                </ListItem>
            </List>
            <Keyboards />
        </div>
      </div>
    );
};

export default Home;
