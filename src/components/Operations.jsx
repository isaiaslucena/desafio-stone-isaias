import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(3.6)
  },
}));

const currencies = [
  {
    value: 'brita',
    label: 'Brita$',
  },
  {
    value: 'reais',
    label: 'R$',
  },
  {
    value: 'bitcoin',
    label: '฿TC',
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

  const BuyClick = () => {
    if (values.SelectedBuy === values.SelectedBuyWith) {
      alert('You cannot buy the same currency, select a different one...');
    } else {
      // console.log(pstate);
      // alert(`You want to buy ${values.BuyAmount} ${values.SelectedBuy} with ${values.SelectedBuyWith}`);

      switch (values.SelectedBuy) {
        case 'brita':
          console.log('Want to buy brita with '+values.SelectedBuyWith);
          if (values.SelectedBuyWith === 'reais') {
            SubFromBalance(pstate.userRS, BuymCurrency(pstate.currencyBT.buy), 'userRS', pstate.userBT, 'userBT');
          } else {
            SubFromBalance(pstate.userBC, BuydCurrency((1 / pstate.currencyBTBC.buy), 'userBC', pstate.userBT, 'userBT'));
          }
          break;
        case 'bitcoin':
            console.log('Want to buy bitcoin with '+values.SelectedBuyWith);
            if (values.SelectedBuyWith === 'reais') {
              SubFromBalance(pstate.userRS, BuymCurrency(pstate.currencyBC.buy), 'userRS', pstate.userBC, 'userBC');
            } else {
              SubFromBalance(pstate.userBT, BuydCurrency(pstate.currencyBTBC.buy), 'userBT', pstate.userBC, 'userBC');
            }
          break;
        case 'reais':
            console.log('Want to buy reais with '+values.SelectedBuyWith);
            if (values.SelectedBuyWith === 'brita') {
              SubFromBalance(pstate.userBT, BuymCurrency((1 / pstate.currencyBT.buy)), 'userBT', pstate.userRS, 'userRS');
            } else {
              SubFromBalance(pstate.userBC, BuymCurrency((1 / pstate.currencyBC.buy)), 'userBC', pstate.userRS, 'userRS');
            }
          break;
        default:
          alert('Unknown currency!');
          break;
      }
    }
  }

  const BuymCurrency = (selC) => {
    let final = parseFloat(values.BuyAmount) * selC;
    console.log(`You bought ${values.BuyAmount} and spent ${final}`);
    return final;
  }

  const BuydCurrency = (selC) => {
    let final = parseFloat(values.BuyAmount) * selC
    console.log(`You bought ${values.BuyAmount} and spent ${final}`);
    return final;
  }

  const SubFromBalance = (balance, sub, balanceStr, balanceP, balanceStrP) => {
    if (sub > balance) {
      alert(`You don't have enought balance to buy ${sub} !`);
    } else {
      let final = balance - sub;
      props.setuserbalance(balanceStr, final);
      let finalp = parseInt(balanceP) + parseInt(values.BuyAmount);
      props.setuserbalance(balanceStrP, finalp);
    }
  }

  return (
    <div>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={3}>
          <TextField fullWidth select id="select-buy"
            label="Buy" margin="normal"
            value={values.SelectedBuy}
            onChange={handleChange('SelectedBuy')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}>
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth id="input-buyamount"
          label="Amount" margin="normal"
          value={values.BuyAmount}
          onChange={handleChange('BuyAmount')}></TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth select id="select-buywith"
              label="With" margin="normal"
              value={values.SelectedBuyWith}
              onChange={handleChange('SelectedBuyWith')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}>
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth className={classes.button}
          variant="contained" color="primary"
          onClick={() => BuyClick(values.BuyAmount)}>
            Buy
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}