import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Login from './components/Login.jsx'
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

function About() {
  return <h3>About Test Route</h3>
}

function Topics() {
  return <h3>Topics Test Route</h3>
}

export default App;