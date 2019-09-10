import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from './components/Login.jsx'
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = require('./firebase-config.json').result;
const firebaseApp = firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      loggedIn: false,
      gSignedIn: false,
      userName: "",
      userEmail: "",
      userImg: ""
		}
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({gSignedIn: !!user});
      if (this.state.gSignedIn) {
        this.setState({
          userName: user.displayName,
          userEmail: user.email,
          userImg: user.photoURL,
          loggedIn: true
        });
      } else {
        this.setState({
          userName: "",
          userEmail: "",
          userImg: "",
          loggedIn: false
        });
      }

      console.log(user);
      console.log(this.state);
    });
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
  console.log(props);
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