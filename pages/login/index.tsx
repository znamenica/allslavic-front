import {Box, Button, Container, FormControl, Input, InputLabel} from "@mui/material";
import {useEffect, useState} from "react";
import Api from "../api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {getMe, setLoggedIn} from "../../store/reducers/me";
import {useAppDispatch, useAppSelector} from "../../hooks";

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.me.loggedIn);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onLogIn = () => {
        Api.auth.login(name, password).then(res => res.json()).then(data => {
            if (data) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                dispatch(setLoggedIn(true));
                dispatch(getMe(data.access_token));
                router.push('/');
            }
        });
    };
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);
    return (
        <Container
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
          }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    width: '25ch',
                    flexDirection: 'column',
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Login</InputLabel>
                    <Input id="component-simple" value={name} onChange={handleChangeName} />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Password</InputLabel>
                    <Input
                        value={password}
                        onChange={handleChangePassword}
                        id="filled-password-input"
                        type="password"
                        autoComplete="current-password"
                    />
                </FormControl>
                <Button onClick={onLogIn}>Log in</Button>
            </Box>
        </Container>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default Login;
