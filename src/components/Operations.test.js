import React from 'react';
import Operations from './Operations';
import {render,fireEvent} from "@testing-library/react";

const fakestatus = {
  userRS: 100000,
  userBT: 100000,
  userBC: 100000,
  currencyBT: {buy: 4.60, sell: 4.60},
  currencyBTBC: {buy: 8000.20, sell: 8000.20},
  currencyBC: {buy: 36000.40, sell: 36000.40}
};

const arrayvals = [
  ["brita", 1, "reais", 99995.4, 100001, "userBT"],
  ["brita", 10000, "bitcoin", 99998.75003124922, 110000, "userBT"],

  ["bitcoin", 1, "reais", 63999.6, 100001, "userBC"],
  ["bitcoin", 1, "brita", 91999.8, 100001, "userBC"],

  ["reais", 10000, "brita", 97826.08695652174, 110000, "userRS"],
  ["reais", 40000, "bitcoin", 99998.88890123443, 140000, "userRS"]
]

test.only.each(arrayvals)("Buy %s the amount of %i with %s", async (buy, amount, buywith, valsub, valplus, balstrsub) => {
  var finalvaluesub = 0;
  var finalvalueplus = 0;

  const setuserbalance = (balanceStr, finalval) => {
    console.log(`Balance: ${balanceStr} | Value: ${finalval}`);
    if (balanceStr === balstrsub) {
      finalvalueplus = finalval;
    } else {
      finalvaluesub = finalval;
    }
  };

  const addstatement = jest.fn();

  const {getByTestId} = render(<Operations state={fakestatus} setuserbalance={setuserbalance} addstatement={addstatement} />);

  const buyselect = getByTestId("op-buy-sel");
  const buyamount = getByTestId("op-amount-input");
  const buywithselect = getByTestId("op-buywith-sel");
  const buybutton = getByTestId("op-buy-button");

  fireEvent.change(buyselect, {target: {value: buy}});
  fireEvent.change(buyamount, {target: {value: amount}});
  fireEvent.change(buywithselect, {target: {value: buywith}});
  fireEvent.click(buybutton);

  expect(finalvaluesub).toEqual(valsub);
  expect(finalvalueplus).toEqual(valplus);
});