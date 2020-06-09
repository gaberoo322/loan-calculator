import React, { useState, useEffect } from "react"

interface FormProps {
  loanAmount: number
  onSetAmount: Function
  loanTerm: number
  onSetTerm: Function
  loanLTV: number
  onSetLTV: Function
  loanRepaymentOption: string
  onSetRepaymentOption: Function
}

const CalculatorForm: React.FC<FormProps> = (props: FormProps) => {
  const [isValidAmount, setIsValidAmount] = useState(true)
  const [isAmountDirty, setIsAmountDirty] = useState(false)

  const numberToCurrency = (number: number): string => {
    return `$${new Intl.NumberFormat("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)}`
  }

  const currencyToNumber = (val: string): number => {
    let numberString: string = val.replace("$", "")
    numberString = numberString.replace(",", "").replace(",", "")
    const amount: number = isNaN(parseInt(numberString))
      ? 0
      : parseInt(numberString)
    return amount
  }

  useEffect((): Boolean => {
    let isValid = true
    if (isAmountDirty) {
      if (props.loanAmount < 5000 || props.loanAmount > 25000000) {
        isValid = false
      } else {
        isValid = true
      }
    }
    setIsValidAmount(isValid)
  }, [props.loanAmount, isAmountDirty])

  const emitAmountHandler = (amount): void => {
    props.onSetAmount(currencyToNumber(amount))
  }

  const radioOptionsLTV: Array<number> = [3, 4, 5, 6, 7]
  const radioInputsLTV = radioOptionsLTV.map(option => {
    return (
      <span key={option} className="radio-btn--wrapper">
        <input
          tabIndex={0}
          className="input radio-btn--hide"
          id={`${option}`}
          type="radio"
          value={option}
          checked={props.loanLTV === option}
          onChange={event => {
            props.onSetLTV(parseInt(event.target.value))
          }}
        />
        <label className="radio-btn" htmlFor={`${option}`}>
          {`${option}0%`}
        </label>
      </span>
    )
  })

  const radioOptionsRepayment: Array<string> = ["IO", "PI"]
  const radioInputsRepayment = radioOptionsRepayment.map(option => {
    return (
      <span key={option} className="radio-btn--wrapper">
        <input
          tabIndex={0}
          className="input radio-btn--hide"
          id={option}
          type="radio"
          value={option}
          checked={props.loanRepaymentOption === option}
          onChange={event => {
            props.onSetRepaymentOption(event.target.value)
          }}
        />
        <label className="radio-btn" htmlFor={option}>
          {option === "IO" ? "Interest Only" : "Principal & Interest"}
        </label>
      </span>
    )
  })

  return (
    <section className="calculator-form">
      <label className="label">
        How much do you want to borrow?
        <input
          className="input"
          placeholder="Enter desired loan amount in USD"
          type="tel"
          maxLength={11}
          value={`${numberToCurrency(props.loanAmount)}`}
          onChange={event => {
            emitAmountHandler(event.target.value)
          }}
          onBlur={event => {
            setIsAmountDirty(true)
          }}
        />
        {!isValidAmount && (
          <span className="error-text">
            Must be between $5,000 and $25,000,000
          </span>
        )}
      </label>

      <label className="label">
        How long do you need to pay back?
        <input
          className="input"
          type="range"
          min="3"
          max="36"
          value={props.loanTerm}
          onChange={event => {
            props.onSetTerm(event.target.value)
          }}
        />
        <div className="input-value-text">{props.loanTerm}</div>
      </label>

      <label className="label" htmlFor="LTV">
        Loan-to-Value (LTV)
        <div className="radio-btn-list">{radioInputsLTV}</div>
      </label>
      <label className="label" htmlFor="RepaymentOptions">
        Repayment Option
        <div className="radio-btn-list">{radioInputsRepayment}</div>
      </label>
    </section>
  )
}

export default CalculatorForm
