import React, { useState } from "react"

import CalculatorForm from "../components/calculator-form"
import CalculatorDetails from "../components/calculator-details"

const LoanCalculator: React.FC = () => {
  console.log("LOAN-CALCULATOR-RENDER")
  const [loanAmount, setLoanAmount] = useState("5000")

  return (
    <section>
      <h2>Loan Calculator</h2>
      <CalculatorDetails />
      <CalculatorForm loanAmount={loanAmount} onSubmitAmount={setLoanAmount} />
    </section>
  )
}

export default LoanCalculator
