import React, { Fragment } from "react";
import "./App.css";
//const feedDisplay = document.getElementById("root");

import ListResults from "./components/ListResults";

function App() {
  return (
    <Fragment>
      <div className="container">
        <ListResults />
      </div>
    </Fragment>
  );
}

export default App;
