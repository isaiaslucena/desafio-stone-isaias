import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {Redirect, Link as LinkRouter} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.googleLoginClick = this.googleLoginClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	googleLoginClick() {
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// var token = result.credential.accessToken;
			// The signed-in user info.
			// var user = result.user;
		}).catch(function(error) {
			// Handle Errors here.
			// var errorCode = error.code;
			// var errorMessage = error.message;
			// The email of the user"s account used.
			// var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			// var credential = error.credential;
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(event);
		alert("This feature is not available! Please sigin with Google credentials!");
		// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// 	// Handle Errors here.
		// 	var errorCode = error.code;
		// 	var errorMessage = error.message;
		// });
	}

	render() {
		const isSignIn = this.props.isSignIn;
		const isLoggedIn = this.props.state.loggedIn;
		let rememberme, forgotAndsignup;

		if (isSignIn) {
			rememberme = <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />;
			forgotAndsignup = (
				<Grid container>
					<Grid item xs>
						<LinkRouter className="login-link" to="/forgot">
							Forgot password?
						</LinkRouter>
					</Grid>
					<Grid item>
						<LinkRouter className="login-link" to="/signup">
							{"Don"t have an account? Sign Up"}
						</LinkRouter>
					</Grid>
				</Grid>
			);
		} else {
			rememberme = null;
			forgotAndsignup = null;
		}

		return (
			isLoggedIn ? (
				<Redirect to="/" />
			) : (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className="login-div">
						<Avatar className="login-avatar">
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{this.props.btntxt}
						</Typography>
						<form className="login-form" onSubmit={this.handleSubmit}>
							<TextField required fullWidth id="email" name="email" label="Email" margin="normal"/>
							<TextField required fullWidth id="password" name="password" type="password" label="Password" margin="normal" autoComplete="current-password"/>
							{rememberme}
							<Button type="submit" fullWidth variant="contained" color="primary" className="login-submitbtn">
								{this.props.btntxt}
							</Button>
							{forgotAndsignup}
						</form>
					</div>
					<Divider />
					<div className="login-googlebtn">
						<Button type="button" fullWidth variant="contained" color="primary" onClick={this.googleLoginClick}>
							{this.props.btntxt} with Google
						</Button>
					</div>
				</Container>
			)
		);
	}
}

export default Login;