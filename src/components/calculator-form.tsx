import React, { useState } from "react"

interface FormProps {
  loanAmount: number
  onSubmitAmount: Function
}

const CalculatorForm: React.FC<FormProps> = (props: FormProps) => {
  console.log("LOAN-FORM-RENDER")

  // component amount input logic
  const numberToCurrency = (number: number): string => {
    return `${new Intl.NumberFormat().format(number)}`
  }
  const currencyToNumber = (val: string): number => {
    let numberString: string = val.replace("$", "")
    numberString = numberString.replace(",", "").replace(",", "")
    console.log(numberString)
    console.log(parseInt(numberString))
    const amount: number = isNaN(parseInt(numberString))
      ? 0
      : parseInt(numberString)
    return amount
  }
  const emitAmountHandler = (amount): void => {
    props.onSubmitAmount(currencyToNumber(amount))
  }

  // The loan amount should be over 5k and less than 25 million, otherwise show an error on blur
  const isInvalidAmount = (): boolean => {
    return false
  }

  return (
    <>
      <label>
        How much do you want to borrow?
        <input
          placeholder="Enter desired loan amount in USD"
          type="tel"
          value={`$${numberToCurrency(props.loanAmount)}`}
          onChange={event => {
            emitAmountHandler(event.target.value)
          }}
        />
      </label>
    </>
  )
}

export default CalculatorForm
