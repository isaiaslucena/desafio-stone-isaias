import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./components/SignIn";
import Content from "./components/Content";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";
import { openDB } from "idb";

const firebaseConfig = require("./firebase-config.json").result;
const firebaseApp = firebase.initializeApp(firebaseConfig);

async function idDB(userinfo) {
  const db = await openDB("usersDB", 1, {
    upgrade(db) {
      db.createObjectStore("users", {
        keyPath: "userDocId",
				autoIncrement: false,
				unique: true
      });
    }
  });

	const exists = (await db.get("users", userinfo.userDocId)) || false;

	if (exists) {
		await db.put("users", userinfo);
	} else {
		await db.add("users", userinfo);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.fsUsersCol = firebase.firestore().collection("users");
		this.state = {
			loggedIn: false,
			gSignedIn: false,
			gToken: "",
			userName: "",
			userEmail: "",
			userImg: "",
			userId: "",
			userDocId: "",
			userRS: 0.0,
			userBT: 0.0,
			userBC: 0.0,
			currencyBT: {buy: 0, sell: 0},
			currencyBTBC: {buy: 0, sell: 0},
			currencyBC: {buy: 0, sell: 0},
			statement: []
		}
	}

	getBTcurrency = () => {
		let tdate = new Date();
		let tdow = tdate.getDay();
		//check if today is sunday
		if (tdow === 0) {
			tdate.setDate(tdate.getDate()-2);
		//check if today is saturday
		} else if (tdow === 6) {
			tdate.setDate(tdate.getDate()-1);
		}
		let tday = ("0" + tdate.getDate()).slice(-2);
		let tmonth = ("0" + (tdate.getMonth() + 1)).slice(-2);
		let tyear = tdate.getFullYear();
		let todaydate = tmonth+"-"+tday+"-"+tyear;

		axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${todaydate}'&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`).then((resp) => {
			// console.log(resp.data);
			this.setState({
				currencyBT: {
					buy: parseFloat(resp.data.value[0].cotacaoCompra),
					sell: parseFloat(resp.data.value[0].cotacaoVenda)
				}
			});

			axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((resp) => {
				// console.log(resp.data);
				let BritaBC = resp.data.bpi.USD.rate_float;
				let RSBC = BritaBC * this.state.currencyBT.buy;
				this.setState({
					currencyBTBC: {
						buy: BritaBC,
						sell: BritaBC
					},
					currencyBC: {
						buy: RSBC,
						sell: RSBC
					}
				});
			});
		});
	}

	setUserBalance = (balanceStr, newVal) => {
		this.setState({[balanceStr]: newVal});
	}

	addStatement = (subop, plusop) => {
		let now = new Date();
		let nyear = now.getFullYear();
		let nmonth = ("0" + (now.getMonth()+1)).slice(-2);
		let nday = ("0" + now.getDate()).slice(-2);
		let isodate = nyear+"-"+nmonth+"-"+nday;

		let nhour = ("0" + now.getHours()).slice(-2);
		let nmin = ("0" + now.getMinutes()).slice(-2);
		let nsec = ("0" + now.getSeconds()).slice(-2);
		let tfourtime = nhour+":"+nmin+":"+nsec;

		let searchdate = this.state.statement.map(function(item) { return item.date; }).indexOf(isodate);
		if (searchdate === -1) {
			// console.log(`${isodate} not found`);

			let fulllog = {
				"date": isodate,
				"log": [
					{
						"time": tfourtime,
						"operation": subop.type,
						"amount": subop.amount,
						"currency": subop.currency
					},
					{
						"time": tfourtime,
						"operation": plusop.type,
						"amount": plusop.amount,
						"currency": plusop.currency
					}
				],
				"balance": {
					"reais": this.state.userRS,
					"brita": this.state.userBT,
					"bitcoin": this.state.userBC
				}
			};
			this.setState({statement: [ ...this.state.statement, fulllog]});
		} else {
			// console.log(`${isodate} found`);

			let sublog = {
				"time": tfourtime,
				"operation": subop.type,
				"amount": subop.amount,
				"currency": subop.currency
			};
			let pluslog = {
				"time": tfourtime,
				"operation": plusop.type,
				"amount": plusop.amount,
				"currency": plusop.currency
			};

			let carray = [...this.state.statement];
			carray[searchdate].log.push(sublog);
			carray[searchdate].log.push(pluslog);
			carray[searchdate].balance.reais = this.state.userRS;
			carray[searchdate].balance.brita = this.state.userBT;
			carray[searchdate].balance.bitcoin = this.state.userBC;
			this.setState({statement: carray});
		}
	}

	componentWillUnmount = () => {
		this.unregisterAuthObserver();
	}

	componentDidMount = () => {
		//observer auth
		this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				this.getBTcurrency();
				this.setState({
					loggedIn: true,
					userName: user.displayName,
					userEmail: user.email,
					userImg: user.photoURL,
					userId: user.uid,
					gToken: user.refreshToken
				});
				//verify if user exists
				this.fsUsersCol.where("userEmail","==",user.email).get().then((doc) => {
					if (doc.empty) {
						this.setState({
							userRS: 100000.00,
							userBT: 0.0,
							userBC: 0.0
						});
						this.fsUsersCol.add(this.state).then((docAdded) => {
							// console.log("user added to firestore");
							// console.log(docAdded);
							this.setState({userDocId: docAdded.id});
						});
					} else {
						// console.log("user exists on firestore");
						// console.log(doc);
						this.fsUsersCol.doc(doc.docs[0].id).get().then((docGet) => {
							const userData = docGet.data();
							this.setState({
								userDocId: doc.docs[0].id,
								userRS: userData.userRS,
								userBT: userData.userBT,
								userBC: userData.userBC,
								statement: userData.statement
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

	componentDidUpdate = () => {
		if (this.state.loggedIn && this.state.userDocId.length > 0) {
			this.fsUsersCol.doc(this.state.userDocId).set(this.state);

			idDB(this.state);
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" render={props => <Content state={this.state} setuserbalance={this.setUserBalance} addstatement={this.addStatement}/>} />
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