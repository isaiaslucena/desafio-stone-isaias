import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: theme.spacing(3.2)
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

  const BuyClick = event => {
    if (values.SelectedBuy === values.SelectedBuyWith) {
      alert('You cannot buy the same currency, select different one...');
      setValues({
        SelectedBuy: "brita",
        SelectedBuyWith: "reais"
      });
    } else {
      console.log(pstate);
      // alert(`You want to buy ${values.BuyAmount} ${values.SelectedBuy} with ${values.SelectedBuyWith}`);

      switch (values.SelectedBuy) {
        case 'brita':
          console.log('Want to buy brita');
          if (values.SelectedBuyWith === 'reais') {
            let boughtBT = parseFloat(values.BuyAmount) * pstate.currencyBT.buy;
            if (boughtBT > pstate.userRS) {
              alert(`You don't have enought balance to buy Brita$ ${boughtBT} !`);
            } else {
              let subRS = pstate.userRS - boughtBT;
              props.setuserrs(subRS);
            }
          } else {
            //ntd;
          }
          break;
        case 'bitcoin':
            console.log('Want to buy bitcoin');
          break;
        case 'reais':
            console.log('Want to buy reais');
          break;
        default:
          break;
      }
    }
  }

  return (
    <div>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={3}>
          <TextField fullWidth select id="select-buy"
            label="Buy" className={classes.textField}
            margin="normal" value={values.SelectedBuy}
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
          <TextField fullWidth id="input-buyamount" label="Amount"
          className={classes.textField}
          value={values.BuyAmount}
          onChange={handleChange('BuyAmount')}
          margin="normal"></TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth select id="select-buywith"
              label="With" className={classes.textField}
              margin="normal" value={values.SelectedBuyWith}
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
          <Button fullWidth variant="contained" color="primary"
          className={classes.button} onClick={() => BuyClick(values.BuyAmount)}>
            Buy
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}