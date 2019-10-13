import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1.5)
  }
}));

const currencies = [
  {
    value: "brita",
    label: "Brita$",
  },
  {
    value: "reais",
    label: "R$",
  },
  {
    value: "bitcoin",
    label: "฿TC",
  }
];

export default function Operations(props, ref) {
  const classes = useStyles();
  const pstate = props.state;

  const [values, setValues] = useState({
    SelectedBuy: "brita",
    SelectedBuyWith: "reais",
    BuyAmount: 0
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const buymCurrency = (selC) => {
    let final = parseFloat(values.BuyAmount) * selC;
    return final;
  }

  const buydCurrency = (selC) => {
    let final = parseFloat(values.BuyAmount) * selC;
    return final;
  }

  const subFromBalance = (balance, sub, balanceStr, balanceP, balanceStrP) => {
    if (sub > balance) {
      alert(`You don"t have enought balance to buy ${sub} !`);
    } else {
      let final = balance - sub;
      props.setuserbalance(balanceStr, final);
      let sublog = {
        type: "debit",
        amount: sub,
        currency: values.SelectedBuyWith
      }

      let finalp = parseInt(balanceP) + parseInt(values.BuyAmount);
      props.setuserbalance(balanceStrP, finalp);
      let pluslog = {
        type: "credit",
        amount: parseInt(values.BuyAmount),
        currency: values.SelectedBuy
      }
      props.addstatement(sublog, pluslog);
    }
  }

  const buyClick = () => {
    if (values.SelectedBuy === values.SelectedBuyWith) {
      alert("You cannot buy the same currency, select a different one...");
      return false;
    } else {
      switch (values.SelectedBuy) {
        case "brita":
          if (values.SelectedBuyWith === "reais") {
            subFromBalance(pstate.userRS, buymCurrency(pstate.currencyBT.buy), "userRS", pstate.userBT, "userBT");
          } else {
            subFromBalance(pstate.userBC, buydCurrency((1 / pstate.currencyBTBC.buy), "userBC", pstate.userBT, "userBT"));
          }
          break;
        case "bitcoin":
            if (values.SelectedBuyWith === "reais") {
              subFromBalance(pstate.userRS, buymCurrency(pstate.currencyBC.buy), "userRS", pstate.userBC, "userBC");
            } else {
              subFromBalance(pstate.userBT, buydCurrency(pstate.currencyBTBC.buy), "userBT", pstate.userBC, "userBC");
            }
          break;
        case "reais":
            if (values.SelectedBuyWith === "brita") {
              subFromBalance(pstate.userBT, buymCurrency((1 / pstate.currencyBT.buy)), "userBT", pstate.userRS, "userRS");
            } else {
              subFromBalance(pstate.userBC, buymCurrency((1 / pstate.currencyBC.buy)), "userBC", pstate.userRS, "userRS");
            }
          break;
        default:
          alert("Unknown currency!");
          break;
      }
      return true;
    }
  }

  return (
    <div>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={3}>

          <InputLabel shrink htmlFor="buy-placeholder">Buy</InputLabel>
          <NativeSelect fullWidth
            value={values.SelectedBuy}
            onChange={handleChange("SelectedBuy")}
            inputProps={{ "data-testid": "op-buy-sel", id: "buy-placeholder" }}>
            {currencies.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth inputProps={{ "data-testid":"op-amount-input" }}
          label="Amount"
          value={values.BuyAmount}
          onChange={handleChange("BuyAmount")}></TextField>
        </Grid>
        <Grid item xs={3}>

        <InputLabel shrink htmlFor="buywith-placeholder">Buy with</InputLabel>
          <NativeSelect fullWidth
            value={values.SelectedBuyWith}
            onChange={handleChange("SelectedBuyWith")}
            inputProps={{ "data-testid": "op-buywith-sel", id: "buywith-placeholder" }}>
            {currencies.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth data-testid="op-buy-button"
          className={classes.button}
          variant="contained" color="primary"
          onClick={() => buyClick()}>
            Buy
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}