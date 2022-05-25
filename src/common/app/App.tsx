import React, {useEffect, useState} from 'react';
import './App.css';
import Pages from "./Pages";
import Config from "../utils/Config";

function App() {
    // const [showing, setShowing] = useState(true);
    //
    // useEffect(() => {
    //     setShowing(true);
    // }, []);


    useEffect(() => {
      Config.init().then(config => {
          console.log("success", config)
          Config.set(config);
      }).catch(() => {
          console.log("error");
      });
    }, []);
    // if (!showing) {
    //     return null;
    // }
    return (
        <Pages />
    );
}

export default App;
