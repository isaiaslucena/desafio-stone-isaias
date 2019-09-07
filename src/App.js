import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			userName: "Unkown User"
		}
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
            <Route render={props => <NotFound state={this.state} />}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function NotFound(props) {
  return (
    props.state.loggedIn ? (
      <Redirect to="/"/>
    ) : (
      <Redirect to="/login"/>
    )
  );
}

function DefaultHome() {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  )
}

function Login() {
  return <h3>Login Test Route</h3>
}

function About() {
  return <h3>About Test Route</h3>
}

function Topics() {
  return <h3>Topics Test Route</h3>
}

export default App;
