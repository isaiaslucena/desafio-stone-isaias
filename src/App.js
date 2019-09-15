import React from 'react';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SignIn from './components/SignIn.jsx'
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = require('./firebase-config.json').result;
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      loggedIn: false,
      gSignedIn: false,
      userName: "",
      userEmail: "",
      userImg: "",
      userId: null,
      usergId: null
    }
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({
          loggedIn: true,
          gSignedIn: true,
          userName: user.displayName,
          userEmail: user.email,
          userImg: user.photoURL,
          usergId: user.uid,
          gToken: user.refreshToken
        });
      } else {
        this.setState({
          loggedIn: false,
          gSignedIn: false,
          userName: "",
          userEmail: "",
          userImg: "",
          userId: null,
          usergId: null,
          gToken: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => <RootPath state={this.state} />} />
            <Route path="/signin" render={props => <SignIn state={this.state} isSignIn={true} btntxt="Sign in" />}/>
            <Route path="/forgot" component={Forgot} />
            <Route path="/signup" render={props => <SignIn state={this.state} isSignIn={false} btntxt="Sign up" />} />
            <Route render={props => <NotFound state={this.state} />}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

class RootPath extends React.Component {
	constructor(props) {
    super(props)
    this.SignOutClick = this.SignOutClick.bind(this);
	}

  SignOutClick() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('signned out sucessfuly!');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  }

	render() {
		return (
			this.props.state.loggedIn ? (
				<div>
					<h1>Welcome {this.props.state.userName}</h1>
					<h3>Content Root Path</h3>
					<Button type="button" variant="contained" color="primary" onClick={this.SignOutClick}>
						Sign Out
					</Button>
				</div>
			) : (
				<Redirect to="/signin" />
			)
		)
	}
}

function NotFound(props) {
  console.log(props);
  return (
    props.state.loggedIn ? (
      <RootPath />
    ) : (
      <Redirect to="/signin" />
    )
  );
}

function Forgot() {
  return <h1>Forgot Password Route</h1>
}

export default App;