import React, { ReactElement } from "react"

import CalculatorForm from "../components/calculator-form"
import CalculatorDetails from "../components/calculator-details"

const LoanCalculator = (): ReactElement => {
  return (
    <div>
      <h2>Loan Calculator</h2>
      <p>this will be the loan calculator!</p>
      <CalculatorDetails />
      <CalculatorForm />
    </div>
  )
}

export default LoanCalculator
