import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import styled from "styled-components"
import RightSidebar from "../components/RightSidebar"
import UTMLink from "../components/UTMLink"
import Button from "../components/Button"
import { becomeAnOrganizer } from "../helpers/mixpanel"

const Article = styled.article`
  .prose p strong {
    color: #ff877b;
    font-family: "Avenir Heavy WF";
    font-weight: 400;
  }
`

const Post = ({ data, pageContext }) => {
  const edge = data?.allMarkdownRemark.edges[0]
  const post = edge.node
  const { next, previous } = pageContext
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={`https://why.withfriends.co${post.frontmatter.headerImage.childImageSharp.fixed.src}`}
        url={`https://why.withfriends.co/posts${post.fields.slug}`}
      />
      <Article className="w-full flex justify-center flex-wrap mb-4 md:mb-16">
        <div className="mb-4 md:mb-8 w-full max-w-screen-2xl">
          <Img
            fadeIn={true}
            fluid={post.frontmatter.headerImage.childImageSharp.fluid}
            alt={post.frontmatter.title}
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-center max-w-screen-2xl">
          <div className="flex flex-wrap md:flex-nowrap pt-4">
            <div className="w-full flex-grow-1 hidden xl:block xl:order-1 xl:pr-8 xl:border-wfGray-300 xl:border-r xl:max-w-xs xl:mr-8">
              <div className="flex-grow-0">
                <h3>What's inside</h3>
                {post.headings.map(h => {
                  let classNames = ""
                  switch (h.depth) {
                    case 2:
                      classNames += " mt-2 pt-2 border-t border-wfGray-300"
                      break
                    case 3:
                      classNames += " ml-4"
                      break
                    case 4:
                      classNames += " ml-8"
                      break
                    default:
                      break
                  }
                  return (
                    <div key={h.id} className={classNames}>
                      <a href={`#${h.id}`}>{h.value}</a>
                      <br />
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="px-0 md:pr-8 order-1 md:order-2">
              <div className="prose prose-md md:prose-lg max-w-none w-full flex flex-wrap justify-center">
                <div className="max-w-prose w-full">
                  <h1 className="mb-4">{post.frontmatter.title}</h1>
                  <div className="text-wfGray-600 text-sm">
                    Posted on {post.frontmatter.date} by {post.frontmatter.author}
                  </div>
                </div>
                <div 
                  className="flex flex-wrap justify-center max-w-prose" 
                  dangerouslySetInnerHTML={{ __html: post.html }}>
                </div>
              </div>
              <div className="flex justify-center">
                <UTMLink
                  className="inline-block justify-self-end justify-end no-underline"
                  href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/364/sign_up/modal"}
                  text="Get Started"
                >
                  <Button
                    onClick={becomeAnOrganizer}
                    className="no-underline"
                    variant="salmon"
                  >
                    Get Started
                  </Button>
                </UTMLink>
              </div>
              <div className="border-wfGray-300 border-b pb-4 mb-4 block" />
              <div className="w-full my-4 flex justify-center">
                <h4 className="border-b border-wfGray-300 inline">
                  Keep reading, keep learning
                </h4>
              </div>
              <div className="grid grid-cols-2">
                {previous && (
                  <Link to={`/posts${previous?.fields.slug}`}>
                    {previous?.frontmatter?.title}
                  </Link>
                )}
                {next && (
                  <Link
                    className="text-right"
                    to={`/posts${next?.fields.slug}`}
                  >
                    {next?.frontmatter?.title}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>
      </Article>
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
          headings {
            id
            depth
            value
          }
          tableOfContents(absolute: false)
          ...PostFragment
        }
      }
    }
  }

  fragment PostFragment on MarkdownRemark {
    fields {
      slug
    }
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
