import React from 'react';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

class Content extends React.Component {
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

export default Content;