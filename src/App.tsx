import * as React from "react";
import "./App.css";
import { NavBar } from "./features/navbar/NavBar";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          pass
        </div>
      </div>
    );
  }
}

export default App;
