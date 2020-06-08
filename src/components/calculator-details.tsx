import React, { useState } from "react"

interface FormProps {
  loanAmount: number
  loanTerm: number
  loanLTV: string
  loanRepaymentOption: string
}

const CalculatorDetails: React.FC<FormProps> = (props: FormProps) => {
  console.log("LOAN-DETAILS-RENDER")

  return (
    <section>
      <div>
        <div>Monthly Payments</div>
        <div>TBD</div>
      </div>
      <div>
        <div>Loan Amount</div>
        <div>{props.loanAmount}</div>
      </div>
      <div>
        <div>APR</div>
        <div>Assume a base interest rate (APR) of 10% for a 60% LTV.</div>
        <div>
          Every 10% decrease in LTV results in a 1% drop in APR and vice versa
        </div>
      </div>
      <div>
        <div>Total Loan Cost</div>
        <div>props.loanAmount + interest</div>
      </div>
      <div>
        <div>Interest</div>
        <div>asdasdfasdf</div>
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
