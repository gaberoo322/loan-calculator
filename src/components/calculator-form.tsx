import React, { useState, useEffect } from "react"

interface FormProps {
  loanAmount: number
  onSubmitAmount: Function
}

const CalculatorForm: React.FC<FormProps> = (props: FormProps) => {
  console.log("LOAN-FORM-RENDER")
  const [isValidAmount, setIsValidAmount] = useState(true)

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
  const checkIsValidAmount = (): void => {
    if (props.loanAmount <= 5000 || props.loanAmount >= 25000000) {
      setIsValidAmount(false)
    } else {
      setIsValidAmount(true)
    }
  }

  return (
    <>
      <label>
        How much do you want to borrow?
        <input
          placeholder="Enter desired loan amount in USD"
          type="tel"
          maxLength={11}
          value={`$${numberToCurrency(props.loanAmount)}`}
          onChange={event => {
            emitAmountHandler(event.target.value)
          }}
          onBlur={event => {
            checkIsValidAmount()
          }}
        />
        {!isValidAmount && <p>error message here</p>}
      </label>
    </>
  )
}

export default CalculatorForm
