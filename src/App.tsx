import React, { Suspense, useEffect } from 'react';
import './App.css';
import Pages from "./app/Pages";
import {BrowserRouter} from "react-router-dom";
import Config from "./app/utils/Config";

function App() {
  useEffect(() => {
      Config.init().then(config => {
          console.log("success", config)
          Config.set(config);
      }).catch(() => {
          console.log("error");
      });
  }, []);
  return (
      <Suspense fallback="Загрузка...">
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </Suspense>
  );
}

export default App;
