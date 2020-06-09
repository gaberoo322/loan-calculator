import React, { useState, useEffect } from "react"

import IconBTC from "cryptocurrency-icons/svg/black/btc.svg"
import IconLTC from "cryptocurrency-icons/svg/black/ltc.svg"
import IconDASH from "cryptocurrency-icons/svg/black/dash.svg"
import IconDOGE from "cryptocurrency-icons/svg/black/doge.svg"
import IconETH from "cryptocurrency-icons/svg/black/eth.svg"
import IconSALT from "cryptocurrency-icons/svg/black/salt.svg"

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

  const formatCoinAmount = (coinPrice: number): string => {
    const formattedCoinCollateral = new Intl.NumberFormat("en").format(
      totalAmountDue() / coinPrice
    )
    return `${formattedCoinCollateral}`
  }

  const [coinPrices, setCoinPrices] = useState({
    bitcoin: { usd: 0 },
    dash: { usd: 0 },
    dogecoin: { usd: 0 },
    ethereum: { usd: 0 },
    litecoin: { usd: 0 },
    salt: { usd: 0 },
  })

  useEffect(() => {
    const coinIdParams: string = encodeURIComponent(
      "bitcoin,litecoin,dash,dogecoin,ethereum,salt"
    )
    const currencyTypeParams = "usd"

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIdParams}&vs_currencies=${currencyTypeParams}`
    )
      .then(response => response.json())
      .then(response => {
        setCoinPrices(response)
      })
      .catch(error => {
        console.error(error)
        return {}
      })
  }, [])

  return (
    <section className="calculator-details">
      <div className="text-label--wrapper">
        <div className="text-label--label ">
          Monthly Payment ({props.loanTerm} months)
        </div>
        <div className="text-label--value text-label--value-big">
          {numberToCurrency(monthlyPaymentAmount())}
        </div>
      </div>
      <div className="text-label--group">
        <div className="text-label--wrapper">
          <div className="text-label--label">Loan Amount</div>
          <div className="text-label--value">
            {numberToCurrency(props.loanAmount)}
          </div>
        </div>
        <div className="text-label--wrapper">
          <div className="text-label--label">APR</div>
          <div className="text-label--value">{`${(
            loanInterestAPR() * 100
          ).toFixed(2)}%`}</div>
        </div>
      </div>
      <div className="text-label--group">
        <div className="text-label--wrapper">
          <div className="text-label--label">Total Loan Cost</div>
          <div className="text-label--value">
            {numberToCurrency(totalAmountDue())}
          </div>
        </div>
        <div className="text-label--wrapper">
          <div className="text-label--label">Interest</div>
          <div className="text-label--value">
            {numberToCurrency(totalAmountDue() - props.loanAmount)}
          </div>
        </div>
      </div>
      <div className="text-label--wrapper">
        <div className="text-label--label">Collateral Needed</div>
        <div className="text-label--value">
          {`${numberToCurrency(props.loanAmount / props.loanLTV)} worth of:`}
        </div>
      </div>
      <div className="coin--list">
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconBTC} alt="Bitcoin Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.bitcoin.usd
          )} BTC`}</span>
        </div>
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconLTC} alt="Litecoin Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.litecoin.usd
          )} LTC`}</span>
        </div>
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconDASH} alt="Dash Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.dash.usd
          )} DASH`}</span>
        </div>
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconDOGE} alt="Doge Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.dogecoin.usd
          )} DOGE`}</span>
        </div>
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconETH} alt="Ethereum Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.dogecoin.usd
          )} ETH`}</span>
        </div>
        <div className="coin--wrapper">
          <img className="coin--icon" src={IconSALT} alt="Ethereum Icon" />
          <span className="coin--price">{`${formatCoinAmount(
            coinPrices.salt.usd
          )} SALT`}</span>
        </div>
      </div>
    </section>
  )
}

export default CalculatorDetails
