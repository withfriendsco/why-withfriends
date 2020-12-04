import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostTeaser = ({ post, feature }) => (
  <article
    className={`max-w-xl border-b border-wfGray-300 pb-4 mb-4 prose ${
      feature ? "prose-2xl" : "prose-md"
    }`}
  >
    <Link
      className="no-underline hover:underline"
      to={`/posts${post.fields.slug}`}
    >
      <h2>{post.frontmatter.title}</h2>
    </Link>
    <div className="text-wfGray-600 text-sm">
      Posted on {post.frontmatter.date} by {post.frontmatter.author}
    </div>
    <Link
      className="no-underline hover:underline"
      to={`/posts${post.fields.slug}`}
    >
      <Img
        fadeIn={true}
        fluid={post.frontmatter.headerImage?.childImageSharp?.fluid}
        alt={post.frontmatter.title}
      />
    </Link>
    <div
      className={feature ? "lede" : ""}
      dangerouslySetInnerHTML={{ __html: post.excerpt }}
    />
    <p className="text-right text-md">
      <Link
        className="no-underline hover:underline"
        to={`/posts${post.fields.slug}`}
      >
        ...read more
      </Link>
    </p>
  </article>
)

export default PostTeaser
