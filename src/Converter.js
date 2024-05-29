import React, { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';

function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const BASE_URL = 'https://api.fastforex.io/fetch-all?api_key=098c7413f8-2d0596c9d1-se8l2i';

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.results)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.results)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.results[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const url = `https://api.fastforex.io/fetch-one?from=${fromCurrency}&to=${toCurrency}&api_key=098c7413f8-2d0596c9d1-se8l2i`;
      fetch(url)
        .then(res => res.json())
        .then(data => setExchangeRate(data.result[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h3>Converter</h3>
      <CurrencyRow
        selectCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>=</div>
      <CurrencyRow
        selectCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default Converter;
