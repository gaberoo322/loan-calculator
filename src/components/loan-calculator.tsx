import React, { useState } from "react"

import CalculatorForm from "../components/calculator-form"
import CalculatorDetails from "../components/calculator-details"

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(12)
  const [loanLTV, setLoanLTV] = useState(6)
  const [loanRepaymentOption, setLoanRepaymentOption] = useState("IO")
  return (
    <>
      <section>
        <h2>Loan Calculator</h2>
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
        <CalculatorDetails
          loanAmount={loanAmount}
          loanTerm={loanTerm}
          loanLTV={loanLTV}
          loanRepaymentOption={loanRepaymentOption}
        />
      </section>
    </>
  )
}

export default LoanCalculator
