import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SignIn from './components/SignIn.jsx'
import Content from './components/Content.jsx'
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = require('./firebase-config.json').result;
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
	constructor(props) {
		super(props)
    this.fsUsersCol = firebase.firestore().collection('users');
		this.state = {
			loggedIn: false,
			gSignedIn: false,
			userName: "",
			userEmail: "",
			userImg: "",
			userId: null,
			usergId: null,
			userRS: 0.0,
			userBT: 0.0,
			userBC: 0.0,
			currencyBT: 0.0,
			currencyBC: 0.0
		}
	}

	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	componentDidMount() {
		//observer auth
		this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					loggedIn: true,
					userName: user.displayName,
					userEmail: user.email,
					userImg: user.photoURL,
					usergId: user.uid,
					gToken: user.refreshToken
				});
				//verify if user exists
				this.fsUsersCol.where('userEmail','==',user.email).get().then((doc) => {
					if (doc.empty) {
						this.setState({
							userRS: 100000.00,
							userBT: 0.0,
							userBC: 0.0
						});
						this.fsUsersCol.add(this.state).then(function(docAdded) {
							console.log('user added to firestore');
							console.log(docAdded);
						});
					} else {
						this.fsUsersCol.doc(doc.docs[0].id).get().then((docGet) => {
							const userData = docGet.data();
							this.setState({
								userRS: userData.userRS,
								userBT: userData.userBT,
								userBC: userData.userBC
							});
						});
					}
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
					userRS: 0.0,
					userBT: 0.0,
					userBC: 0.0
				});
			}
		});
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" render={props => <Content state={this.state} />} />
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

function NotFound(props) {
	// console.log(props);
	return (
		props.state.loggedIn ? (
			<Content />
		) : (
			<Redirect to="/signin" />
		)
	);
}

function Forgot() {
	return <h3>Forgot Password Route</h3>
}

export default App;