import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

function App() {
  let Di = styled.div`
    width: 500px;
    height: 500px;
    background-color: #333;
  `;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Di></Di>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
