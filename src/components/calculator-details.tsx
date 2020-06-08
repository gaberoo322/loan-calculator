import React, { useState } from "react"

interface FormProps {
  loanAmount: number
  loanTerm: number
  loanLTV: number
  loanRepaymentOption: string
}

const CalculatorDetails: React.FC<FormProps> = (props: FormProps) => {
  console.log("LOAN-DETAILS-RENDER")
  const loanInterestAPR = (): number => {
    const deviation = props.loanLTV - 6
    const APR = (10 + deviation) / 100
    return APR
  }
  const loanInterestAmount = (): number => {
    const interestAmount =
      5000 * (1 + loanInterestAPR() / 12) ** props.loanTerm - 5000
    console.log(interestAmount)
    return interestAmount
  }

  const monthlyPaymentAmount = (): number => {
    if (props.loanRepaymentOption === "IO") {
      return loanInterestAmount() / props.loanTerm
    } else if (props.loanRepaymentOption === "PI") {
      return (loanInterestAmount() + props.loanAmount) / props.loanTerm
    }
  }

  return (
    <section>
      <div>
        <div>Monthly Payments</div>
        <div>{monthlyPaymentAmount()}</div>
      </div>
      <div>
        <div>Loan Amount</div>
        <div>{props.loanAmount}</div>
      </div>
      <div>
        <div>APR</div>
        <div>{loanInterestAPR()}</div>
      </div>
      <div>
        <div>Total Loan Cost</div>
        <div>{loanInterestAmount() + props.loanAmount}</div>
      </div>
      <div>
        <div>Interest</div>
        <div>{loanInterestAmount()}</div>
      </div>
      <div>
        <div>Collateral Needed</div>
        <div>asdfasdf</div>
      </div>
      <div>coin icons will go here :)</div>
    </section>
  )
}

export default CalculatorDetails
