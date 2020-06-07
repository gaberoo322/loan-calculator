import React, { useState } from "react"

import CalculatorForm from "../components/calculator-form"
import CalculatorDetails from "../components/calculator-details"

const LoanCalculator: React.FC = () => {
  console.log("LOAN-CALCULATOR-RENDER")
  const [loanAmount, setLoanAmount] = useState(0)
  const [loanTerm, setLoanTerm] = useState(12)
  return (
    <section>
      <h2>Loan Calculator</h2>
      <CalculatorDetails />
      <CalculatorForm
        loanAmount={loanAmount}
        onSubmitAmount={setLoanAmount}
        loanTerm={loanTerm}
        onSubmitTerm={setLoanTerm}
      />
    </section>
  )
}

export default LoanCalculator
