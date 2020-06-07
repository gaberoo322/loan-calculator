import React, { useState } from "react"

interface FormProps {
  loanAmount: number
  onSubmitAmount: Function
}

const CalculatorForm: React.FC<FormProps> = (props: FormProps) => {
  console.log("LOAN-FORM-RENDER")

  // component amount input logic
  const numberToCurrency = (number: number) => {
    return `${new Intl.NumberFormat().format(number)}`
  }
  const currencyToNumber = (val: string) => {
    let numberString: string = val.replace("$", "")
    numberString = numberString.replace(",", "").replace(",", "")
    console.log(numberString)
    console.log(parseInt(numberString))
    const amount: number = isNaN(parseInt(numberString))
      ? 0
      : parseInt(numberString)
    return amount
  }
  const emitAmountHandler = amount => {
    props.onSubmitAmount(currencyToNumber(amount))
  }

  return (
    <>
      <p>How much do you want to borrow?</p>
      <input
        placeholder="Enter desired loan amount in USD"
        type="tel"
        value={`$${numberToCurrency(props.loanAmount)}`}
        onChange={event => {
          emitAmountHandler(event.target.value)
        }}
      ></input>
    </>
  )
}

export default CalculatorForm
