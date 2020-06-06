import React from "react"
import { PageProps, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"

type DataProps = {
  site: {
    IDK: string
  }
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, path }) => (
  <Layout>
    <SEO title="Home" />

  </Layout>
)

export default IndexPage

export const query = graphql`
{
  site {
    buildTime(formatString: "YYYY-MM-DD hh:mm a z")
  }
}
`
