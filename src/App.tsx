import * as React from "react";
import "./App.css";
import { NavBar } from "./features/navbar/NavBar";
import Game from './features/game/GameContainer';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <Game />
      </div>
    );
  }
}

export default App;
