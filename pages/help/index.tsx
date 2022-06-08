import {useTranslation} from "next-i18next";
import Box from "@mui/material/Box";
import Head from "next/head";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useState} from "react";
import {Alert, Snackbar, TextField} from "@mui/material";

const About = () => {
    const {t} = useTranslation('common');
    const [name, setName] = useState("");
    const [emailFrom, setEmailFrom] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSuccess(false);
    };


    const handleSubmit = () => {
        const data = {
            name,
            emailFrom,
            emailTo: process.env.NEXT_PUBLIC_EMAIL_SUPPORT,
            message,
        };
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((res) => {
            setName("");
            setEmailFrom("");
            setMessage("");
            setIsSuccess(true);
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
            }
        })
    };
    return (
        <Box>
            <Head>
                <title>{t('help')}</title>
                <meta name="description" content={t('help_desc')} />
            </Head>
            <Typography variant="h5">
                {t('help')}
            </Typography>
            <Typography variant="subtitle1">
                {t('help_info')}
            </Typography>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
            >
                <TextField
                    value={name}
                    label={t('your_name')}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    value={emailFrom}
                    label={t('your_email')}
                    onChange={e => setEmailFrom(e.target.value)}
                />
                <TextField
                    value={message}
                    label={t('your_message')}
                    multiline
                    onChange={e => setMessage(e.target.value)}
                />
                <Button onClick={handleSubmit}>
                    {t('send_request')}
                </Button>
            </Box>
            <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {t('sent_ok')}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default About;
