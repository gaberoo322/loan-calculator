import React, { useState } from "react"

import CalculatorForm from "../components/calculator-form"
import CalculatorDetails from "../components/calculator-details"

const LoanCalculator: React.FC = () => {
  console.log("LOAN-CALCULATOR-RENDER")
  const [loanAmount, setLoanAmount] = useState(0)
  const [loanTerm, setLoanTerm] = useState(12)
  const [loanLTV, setLoanLTV] = useState("60%")
  const [loanRepaymentOption, setLoanRepaymentOption] = useState("IO")
  return (
    <section>
      <h2>Loan Calculator</h2>
      <CalculatorDetails />
      <CalculatorForm
        loanAmount={loanAmount}
        onSetAmount={setLoanAmount}
        loanTerm={loanTerm}
        onSetTerm={setLoanTerm}
        loanLTV={loanLTV}
        onSetLTV={setLoanLTV}
        loanRepaymentOption={loanRepaymentOption}
        onSetRepaymentOption={setLoanRepaymentOption}
      />
    </section>
  )
}

export default LoanCalculator
