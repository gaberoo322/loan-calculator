import React, { useState } from "react"

import IconBTC from "cryptocurrency-icons/svg/color/btc.svg"
import IconLTC from "cryptocurrency-icons/svg/color/ltc.svg"
import IconDASH from "cryptocurrency-icons/svg/color/dash.svg"
import IconDOGE from "cryptocurrency-icons/svg/color/doge.svg"
import IconETH from "cryptocurrency-icons/svg/color/eth.svg"

interface FormProps {
  loanAmount: number
  loanTerm: number
  loanLTV: number
  loanRepaymentOption: string
}

const CalculatorDetails: React.FC<FormProps> = (props: FormProps) => {
  const loanInterestAPR = (): number => {
    const deviation = props.loanLTV - 6
    const APR = (10 + deviation) / 100
    return APR
  }

  const monthlyPaymentAmount = (): number => {
    const P = props.loanAmount
    const r = loanInterestAPR() / 12
    const n = props.loanTerm
    if (props.loanRepaymentOption === "IO") {
      return P * r
    } else if (props.loanRepaymentOption === "PI") {
      return (P * (r * (1 + r) ** n)) / ((1 + r) ** n - 1)
    } else {
      console.error("invalid repayment option")
    }
  }

  const totalAmountDue = (): number => {
    if (props.loanRepaymentOption === "IO") {
      return monthlyPaymentAmount() * props.loanTerm + props.loanAmount
    } else if (props.loanRepaymentOption === "PI") {
      return monthlyPaymentAmount() * props.loanTerm
    } else {
      console.error("invalid repayment option")
    }
  }

  const numberToCurrency = (number: number): string => {
    return `$${new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)}`
  }

  return (
    <section className="calculator-details">
      <div>
        <div>Monthly Payment ({props.loanTerm} months)</div>
        <div>{numberToCurrency(monthlyPaymentAmount())}</div>
      </div>
      <div>
        <div>Loan Amount</div>
        <div>{numberToCurrency(props.loanAmount)}</div>
      </div>
      <div>
        <div>APR</div>
        <div>{`${(loanInterestAPR() * 100).toFixed(2)}%`}</div>
      </div>
      <div>
        <div>Total Loan Cost</div>
        <div>{numberToCurrency(totalAmountDue())}</div>
      </div>
      <div>
        <div>Interest</div>
        <div>{numberToCurrency(totalAmountDue() - props.loanAmount)}</div>
      </div>
      <div>
        <div>Collateral Needed</div>
        <div>{numberToCurrency(props.loanAmount / props.loanLTV)}</div>
      </div>
      <div>
        <img src={IconBTC} alt="Bitcoin Icon" />
        <img src={IconLTC} alt="Litecoin Icon" />
        <img src={IconDASH} alt="Dash Icon" />
        <img src={IconDOGE} alt="Doge Icon" />
        <img src={IconETH} alt="Ethereum Icon" />
      </div>
    </section>
  )
}

export default CalculatorDetails
