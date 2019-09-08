import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
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
            <Route exact path="/" render={props => <NotFound state={this.state} />} />
            <Route path="/login" render={props => <Login state={this.state} isSignIn={true} btntxt="Sign in" />}/>
            <Route path="/forgot" component={Forgot} />
            <Route path="/signup" render={props => <Login state={this.state} isSignIn={false} btntxt="Sign up" />} />
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
      <Content />
    ) : (
      <Redirect to="/login"/>
    )
  );
}

function Content() {
  return <h3>Content Route</h3>
}

function Forgot() {
  return <h3>Forgot Password Route</h3>
}

export default App;