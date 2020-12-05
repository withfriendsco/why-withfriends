import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

const Post = ({ data, pageContext }) => {
  const edge = data?.allMarkdownRemark.edges[0]
  const post = edge.node
  const { next, previous } = pageContext
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={`https://words.withfriends.co${post.frontmatter.headerImage.childImageSharp.fixed.src}`}
      />
      <article>
        <div className="mb-4 w-full">
          <Img
            fadeIn={true}
            fluid={post.frontmatter.headerImage.childImageSharp.fluid}
            alt={post.frontmatter.title}
          />
        </div>
        <div className="flex pt-4">
          <div className="pr-8 border-wfGray-300 border-r sm:max-w-xs">
            <div className="flex-grow-0">
              <h4>What's inside:</h4>
              <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
            </div>
          </div>
          <div className="prose prose-md sm:prose-lg pl-8 justify-self-end mr-2 sm:mr-8">
            <h1 className="mb-4">{post.frontmatter.title}</h1>
            <div className="text-wfGray-600 text-sm">
              Posted on {post.frontmatter.date} by {post.frontmatter.author}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="border-wfGray-300 border-b pb-4 mb-4 block" />
            <div className="grid grid-cols-2">
              <Link to={`/posts${next?.fields.slug}`}>
                {next?.frontmatter?.title}
              </Link>
              <Link
                className="text-right"
                to={`/posts${previous?.fields.slug}`}
              >
                {previous?.frontmatter?.title}
              </Link>
            </div>
          </div>
          <div className="pl-4 border-wfGray-300 border-l flex-grow"></div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($slug: String!) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          excerpt(format: PLAIN)
          tableOfContents(absolute: false)
          ...PostFragment
        }
      }
    }
  }

  fragment PostFragment on MarkdownRemark {
    frontmatter {
      title
      date(formatString: "MMMM D, YYYY")
      author
      headerImage {
        childImageSharp {
          fluid(maxWidth: 2400, fit: INSIDE) {
            ...GatsbyImageSharpFluid
          }
          fixed(width: 960) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export default Post
