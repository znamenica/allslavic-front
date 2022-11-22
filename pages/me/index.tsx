import {Box, Button, Container, Input, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import LogoutIcon from '@mui/icons-material/Logout';
import Api from "../api";
import {getMe, setLoggedIn} from "../../store/reducers/me";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Error from 'next/error'
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import {USER_KIND} from "../api/users";
import Link from "next/link";

const Me = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const my = useAppSelector(state => state.me.item);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {t} = useTranslation();
    const [newNickname, setNewNickname] = useState("");
    const [newFirstname, setNewFirstname] = useState("");
    const [newMidname, setNewMidname] = useState("");
    const [newLastname, setNewLastname] = useState("");
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");

    const onLogout = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            Api.auth.logout(token).then(() => {
                router.push('/');
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            dispatch(setLoggedIn(false));
        }
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const fnId = my.names.find(e => e.kind === USER_KIND.FIRST_NAME)?.id;
            const mnId = my.names.find(e => e.kind === USER_KIND.MID_NAME)?.id;
            const lnId = my.names.find(e => e.kind === USER_KIND.LAST_NAME)?.id;
            const nnId = my.names.find(e => e.kind === USER_KIND.NICK_NAME)?.id;
            Api.me.updateMe(my?.id, {
                names_attributes: [
                    { id: fnId, text: newFirstname, alphabeth_id: 1, language_id: 1, kind: USER_KIND.FIRST_NAME },
                    { id: mnId, text: newMidname, alphabeth_id: 1, language_id: 1, kind: USER_KIND.MID_NAME },
                    { id: lnId, text: newLastname, alphabeth_id: 1, language_id: 1, kind: USER_KIND.LAST_NAME },
                    { id: nnId, text: newNickname, alphabeth_id: 1, language_id: 1, kind: USER_KIND.NICK_NAME },
                ],
            }, token).then(() => {
                dispatch(getMe(token));
            });
        }
    };

    useEffect(() => {
        if (my) {
            if (my.accounts?.length > 0) {
                setEmail(my.accounts[0].sid);
            }
            if (my.names?.length > 0) {
                const firstName = my.names.find(e => e.kind === USER_KIND.FIRST_NAME);
                if (firstName) {
                    setNewFirstname(firstName.text);
                }

                const midName = my.names.find(e => e.kind === USER_KIND.MID_NAME);
                if (midName) {
                    setNewMidname(midName.text);
                }

                const lastName = my.names.find(e => e.kind === USER_KIND.LAST_NAME);
                if (lastName) {
                    setNewLastname(lastName.text);
                }

                const nickName = my.names.find(e => e.kind === USER_KIND.NICK_NAME);
                if (nickName) {
                    setNewNickname(nickName.text);
                    setNickName(nickName.text);
                }
            }
        }
    }, [my]);

    if (!isLoggedIn) {
        return <Error statusCode={404} />
    }

    if (!my) {
        return null;
    }

    return (
        <Container>
            <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '10px',
              }}
            >
                <Box>
                    Привет, {nickName || 'пользователь'}!
                    <Button>
                        <Link href="/news/add">
                            {t('add_news')}
                        </Link>
                    </Button>
                    <Button>
                        <Link  href="/library/add">
                            {t('add_text')}
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/tags">
                            {t('manage_tags')}
                        </Link>
                    </Button>
                </Box>
                <Box onClick={onLogout}>
                    <LogoutIcon />
                </Box>
            </Box>
            <Box>
                <Typography variant="body1">
                    Ты можешь: создавать, редактировать, удалять новости, создавать, редактировать, удалять тексты, редактировать информацию о себе.
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25ch',
                    '& > div + div': { marginTop: '20px' },
                }}
                noValidate
                autoComplete="off"
            >
                <Input
                    placeholder="E-mail"
                    value={email}
                    disabled
                />
                <Input
                    placeholder="Nickname"
                    value={newNickname}
                    onChange={e => setNewNickname(e?.target?.value)}
                />
                <Input
                    placeholder="FirstName"
                    value={newFirstname}
                    onChange={e => setNewFirstname(e?.target?.value)}
                />
                <Input
                    placeholder="MidName"
                    value={newMidname}
                    onChange={e => setNewMidname(e?.target?.value)}
                />
                <Input
                    placeholder="LastName"
                    value={newLastname}
                    onChange={e => setNewLastname(e?.target?.value)}
                />
                <Button
                    onClick={handleUpdate}
                    variant="outlined"
                    sx={{ marginTop: '20px' }}
                >
                    {t('save')}
                </Button>
            </Box>
        </Container>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
});

export default Me;
