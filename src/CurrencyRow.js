import React from 'react';

function CurrencyRow({ currencyOptions, selectCurrency, onChangeCurrency, amount, onChangeAmount }) {
  return (
    <div>
      <input 
        value={amount} 
        type='number' 
        style={{ border: "1px solid #9E9E9E", borderRadius: ".3em", padding: ".25rem", width: "7em" }} 
        onChange={onChangeAmount} 
      />
      <select 
        value={selectCurrency} 
        onChange={onChangeCurrency} 
        style={{ marginLeft: ".5rem" }}
      >
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyRow;
