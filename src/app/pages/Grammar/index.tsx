import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import Alphabet from "../../components/grammar/Alphabet";
import {Helmet} from "react-helmet";
import {useSearchParams} from "react-router-dom";

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

const parts = [
  { key: 0, value: 'phonetics'},
  { key: 1, value: 'orthography'},
  { key: 2, value: 'nouns'},
  { key: 3, value: 'verbs'},
  { key: 4, value: 'pronouns'},
  { key: 5, value: 'adjectives'},
  { key: 6, value: 'numerals'},
];

const Grammar = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const [search, setSearch] = useSearchParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearch({ part: newValue.toString() });
  };

  useEffect(() => {
    const elem = parts.find(e => e.key.toString() === search.get("part"));
    if (elem) {
      setValue(elem.key);
    }
  }, [search]);
  return (
      <Box
          sx={{ marginTop: 10, flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Helmet>
          <title>{t('grammar')}</title>
          <meta name={t('grammar')} content="Грамматика межславянского языка" />
        </Helmet>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {parts.map(part => (
              <Tab key={part.key} label={t(part.value)} {...a11yProps(part.key)} />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          {t('phonetics')}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>
            {t('orthography')}
          </Typography>

          <Alphabet />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {t('nouns')}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {t('verbs')}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {t('pronouns')}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {t('adjectives')}
        </TabPanel>
        <TabPanel value={value} index={6}>
          {t('numerals')}
        </TabPanel>
      </Box>
  );
};

export default Grammar;
