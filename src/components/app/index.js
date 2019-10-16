import React from "react";
import "./App.css";
import JokeList from "../JokeList/";

function App() {
  return (
    <div data-test='AppComponent' className='App'>
      <JokeList />
    </div>
  );
}

export default App;
