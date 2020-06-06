import React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LoanCalculator from "../components/loan-calculator"

const IndexPage: React.FC<PageProps> = ()=> (
  <Layout>
    <SEO title="Home" />
    <section>
      <LoanCalculator/>
    </section>
  </Layout>
)

export default IndexPage
