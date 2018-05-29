import * as React from "react";
import "./App.css";
import { NavBar } from "./features/navbar/NavBar";
import { GameContainer } from './features/game/GameContainer';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
        <GameContainer />
      </div>
    );
  }
}

export default App;
