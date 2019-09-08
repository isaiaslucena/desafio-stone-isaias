import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link as LinkRouter} from "react-router-dom";

class Login extends React.Component {
	render() {
		const isSignIn = this.props.isSignIn;
		let rememberme, forgotAndsignup;

		if (isSignIn) {
			rememberme = <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />;
			forgotAndsignup = (<Grid container>
								<Grid item xs>
									<LinkRouter className="login-link" to="/forgot">
										Forgot password?
									</LinkRouter>
								</Grid>
								<Grid item>
									<LinkRouter className="login-link" to="/signup">
										{"Don't have an account? Sign Up"}
									</LinkRouter>
								</Grid>
							</Grid>);
		} else {
			rememberme = null;
			forgotAndsignup = null;
		}

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="login-div">
					<Avatar className="login-avatar">
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{this.props.btntxt}
					</Typography>
					<form className="login-form" noValidate>
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
					<Button type="button" fullWidth variant="contained" color="primary">
						{this.props.btntxt} with Google
					</Button>
				</div>
			</Container>
		)
	}
}

export default Login;