import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class Operations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      BuyBTClick: 0
    }

    this.BuyRSClick = this.BuyRSClick.bind(this);
    this.SellRSClick = this.SellRSClick.bind(this);
    this.BuyBTClick = this.BuyBTClick.bind(this);
    this.SellBTClick = this.SellBTClick.bind(this);
    this.BuyBCClick = this.BuyBCClick.bind(this);
    this.SellBCClick = this.SellBCClick.bind(this);
  }

  BuyRSClick() {
    //test
  }

  SellRSClick() {
    //test
  }

  BuyBTClick(e) {
    e.preventDefault();
    console.log('clicked BuyBTClick');
  }

  SellBTClick() {
    //test
  }
  BuyBCClick() {
    //test
  }

  SellBCClick() {
    //test
  }

  render() {
    return (
      <div>
        <Grid container direction="row" spacing={3}>
            <form className="login-form" onSubmit={this.BuyBTClick}>
              <Grid item xs={4}>
                <FormControl fullWidth className="">
                  <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                  <Input id="adornment-amount"
                  startAdornment={<InputAdornment position="start">Brita$</InputAdornment>}/>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" type="submit" color="primary" className="">Buy With R$</Button>
              </Grid>
              <Grid item xs={3}>
              <Button variant="contained" type="submit" color="primary" className="">Buy With Bitcoin</Button>
              </Grid>
            </form>
          </Grid>

        <Grid container direction="row" justify="center" spacing={3}>
          <Grid item xs={12}>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <TextField required fullWidth id="email" name="email" label="Email" margin="normal"/>
              <Button variant="contained" color="primary">Buy Bitcoin</Button>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Operations;