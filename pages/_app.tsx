import '../styles/global.css'
import { AppProps } from 'next/app'
import Navigation from "../components/Navigation";
import {wrapper} from "../store";
import {appWithTranslation} from "next-i18next";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {getMe, setLoggedIn} from "../store/reducers/me";
import {useAppDispatch} from "../hooks";

const App = ({ Component, pageProps }: AppProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            dispatch(setLoggedIn(true));
            dispatch(getMe(accessToken));
        }
    }, []);
  return (
      <>
          <Navigation />
          <Container maxWidth="xl" sx={{ height: 'calc(100% - 72px)' }}>
              <Box sx={{ height: 'calc(100% - 72px)' }}>
                  <Component {...pageProps} />
              </Box>
          </Container>
      </>
  );
};

export default appWithTranslation(wrapper.withRedux(App));
