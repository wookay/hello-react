import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PropTypes } from 'prop-types'
import { Home, About } from './pages';
import Menu from './components/Menu';
import logo from './logo.svg';
import './App.css';

const tojson = JSON.stringify;

class Comma extends Component {
  render() {
    return (
      ", "
    );
  }
}

class 하더놈 extends Component {
  render() {
    const { prop1, prop2, prop3 } = this.props;
    const isundef = prop3 == undefined;
    return (
        <div>
          하더놈 - 
          { tojson(prop1) }  <Comma />
          { tojson(prop2) }  <Comma />
          { tojson(isundef) }
        </div>
    );
  }
}

하더놈.defaultProps = {  
    prop1: 100,
    prop2: [5,6,7],
    prop3: undefined
}

하더놈.propTypes = {
    prop1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    prop2: PropTypes.arrayOf(PropTypes.number),
    prop3: PropTypes.any
}

/*
https://blog.logrocket.com/validating-react-component-props-with-prop-types-ef14b29963fc/
PropTypes.any
PropTypes.bool
PropTypes.number
PropTypes.string
PropTypes.func
PropTypes.array
PropTypes.object
PropTypes.symbol
PropTypes.node : The prop should be anything that can be rendered by React — a number, string, element, or array (or fragment) containing these types
PropTypes.element : The prop should be a React element
PropTypes.instanceOf
PropTypes.oneOf
PropTypes.oneOfType
*/

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
        <div>
          <하더놈 />
          <하더놈 prop1={"ok"} prop2={[1,2,3]} prop3={"prop3"} />
        </div>
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
