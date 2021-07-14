import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from './pages';
import Menu from './components/Menu';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
    <div className="App">
    <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
    </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          하더놈 <code>src/App.js</code> and save to reload.
        </p>
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
}

export default App;
