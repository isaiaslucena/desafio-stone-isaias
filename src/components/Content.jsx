import React from "react";
import {Redirect} from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import * as firebase from "firebase/app";
import "firebase/auth";

import Operations from "./Operations";
import Statement from "./Statement";

class Content extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      value: 0,
      index: 0
    }
    this.signOutClick = this.signOutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}

	signOutClick() {
		firebase.auth().signOut().then(function() {
      console.log("signned out sucessfuly!");
		}).catch(function(error) {
			// An error happened.
      // console.log(error);
      alert('Error when singinned out!');
		});
	}

  handleChange(event, newVal) {
    this.setState({value: newVal});
  }

  formatStringRS(RSval) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(RSval);
  }

  formatStringBT(BTval) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .formatToParts(BTval)
    .map(({type, value}) => {
      switch (type) {
        case "currency": return "Brita$";
        default : return value;
      }
    }).reduce((string, part) => string + part)
  }

  formatStringBC(BCval) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .formatToParts(BCval)
    .map(({type, value}) => {
      switch (type) {
        case "currency": return "฿TC";
        default : return value;
      }
    }).reduce((string, part) => string + part)
  }

	render() {
		return (
			this.props.state.loggedIn ? (
        <div>
          <Grid container justify="space-between" direction="row" spacing={3}>
            <Grid item xs={4}>
              <Chip avatar={<Avatar src={this.props.state.userImg} />} label={this.props.state.userName} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" component="h4" className="content-textcenter">
                Virtual Wallet
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button type="button" variant="contained" color="primary" className="content-pullright" onClick={this.signOutClick}>
                Sign Out
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" spacing={3}>
            <Grid item xs={6}>
              <Card className="content-card">
                <CardContent>
                  {/* <Typography className="content-cardtitle" color="textSecondary" gutterBottom>
                  </Typography> */}
                  <Typography variant="caption" component="span" className="content-pullright">
                      {new Date().toDateString()}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Balance
                  </Typography>
                  {/* <Typography className="content-cardpos" color="textSecondary">
                  </Typography> */}
                  <Typography variant="h6" component="h6">
                    {/* new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(this.props.state.userRS) */}
                    {this.formatStringRS(this.props.state.userRS)}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {this.formatStringBT(this.props.state.userBT)}
                  </Typography>
                  <Typography variant="body2" component="p">
                  {this.formatStringBC(this.props.state.userBC)}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="content-card">
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5" component="h2">
                        Currency
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="p">Buy</Typography>
                      <Typography variant="body2" component="p">
                        {this.formatStringBT(this.props.state.currencyBT.buy)}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {this.formatStringBC(this.props.state.currencyBC.buy)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" component="p">Sell</Typography>
                      <Typography variant="body2" component="p">
                        {this.formatStringBT(this.props.state.currencyBT.sell)}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {this.formatStringBC(this.props.state.currencyBC.sell)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" spacing={3}>
            <Grid item xs={12}>
              <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs"
                >
                <Tab label="Operations" id="scrollable-auto-tab-1" aria-controls="scrollable-auto-tabpanel-1" />
                <Tab label="Statement" id="scrollable-auto-tab-2" aria-controls="scrollable-auto-tabpanel-2" />
              </Tabs>
              </AppBar>
              <TabPanel value={this.state.value} index={0}>
                <Operations state={this.props.state} setuserbalance={this.props.setuserbalance} addstatement={this.props.addstatement}></Operations>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <Statement state={this.props.state} formatstringbt={this.formatStringBT} formatstringbc={this.formatStringBC}></Statement>
              </TabPanel>
            </Grid>
				  </Grid>
        </div>
      ) : (
				<Redirect to="/signin" />
			)
		)
	}
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tab-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default Content;