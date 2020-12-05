import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import SignupForm from "../components/SignupForm"
import SidebarAd from "../components/SidebarAd"
import styled from "styled-components"

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
        image={`https://words.withfriends.co${post.frontmatter.headerImage.childImageSharp.fixed.src}`}
      />
      <Article>
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
              <h3>What's inside</h3>
              {
                post.headings.map(h => {
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
                    <div className={classNames}>
                      <a href={`#${h.id}`}>{h.value}</a><br />
                    </div>
                  )
                })
              }
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
          <div className="pl-4 border-wfGray-300 border-l flex-grow">
            <div className="bg-wfGray-600 shadow-lg sm:p-8">
              <SignupForm />
            </div>
            <div className="mt-16 w-full" />
            <SidebarAd />
          </div>
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
