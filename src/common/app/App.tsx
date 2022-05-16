import React, {useEffect, useState} from 'react';
import './App.css';
import Pages from "./Pages";
import Config from "../utils/Config";
import {initI18n} from "../i18n";

function App() {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);


  useEffect(() => {
      Config.init().then(config => {
          console.log("success", config)
          Config.set(config);
      }).catch(() => {
          console.log("error");
      });
      initI18n();
  }, []);
    if (!showing) {
        return null;
    }
  return (
      <Pages />
  );
}

export default App;
