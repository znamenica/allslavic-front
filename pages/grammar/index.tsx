import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "next-i18next";
import Alphabet from "../../components/grammar/Alphabet";
import Head from "next/head";
import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
  const { t } = useTranslation('common');
  const router = useRouter();
  const search = router.query;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push({ query: { part: newValue.toString() } })
  };

  useEffect(() => {
    const elem = parts.find(e => e.key.toString() === search["part"]);
    if (elem) {
      setValue(elem.key);
    }
  }, [search]);
  return (
      <Box
          sx={{ marginTop: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}
      >
        <Head>
          <title>{t('grammar')}</title>
          <meta name="description" content={t('grammar_desc')} />
        </Head>
        <Typography variant="h3" gutterBottom component="div">
          {t('grammar')}
        </Typography>
        <Box sx={{ display: 'flex'}}>
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
      </Box>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Grammar;
