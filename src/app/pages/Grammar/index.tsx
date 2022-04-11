import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

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
              <Typography>{children}</Typography>
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

const Grammar = () => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
      <Box
          sx={{ marginTop: 10, flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label={t('phonetics')} {...a11yProps(0)} />
          <Tab label={t('orthography')} {...a11yProps(1)} />
          <Tab label={t('nouns')} {...a11yProps(2)} />
          <Tab label={t('verbs')} {...a11yProps(3)} />
          <Tab label={t('pronouns')} {...a11yProps(4)} />
          <Tab label={t('adjectives')} {...a11yProps(5)} />
          <Tab label={t('numerals')} {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {t('phonetics')}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {t('orthography')}
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
