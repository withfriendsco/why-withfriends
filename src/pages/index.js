import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/PostTeaser"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(e => e.node)
  return (
    <Layout>
      <SEO title="Words from Withfriends" />
      <div className="w-full">
        {posts.slice(0, 1).map(post => (
          <PostTeaser feature={true} post={post} />
        ))}

        {posts.slice(1, 10).map(post => (
          <PostTeaser post={post} />
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            author
            headerImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(format: HTML)
          timeToRead
        }
      }
    }
  }
`

export default IndexPage
