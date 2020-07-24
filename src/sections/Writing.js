import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Box } from 'rebass';
import { StaticQuery, graphql, navigate } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image'

import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);



const CoverImage = styled(Img)`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;


const Post = ({ title, text, heroImage, slug, createdAt, readingTime }) => (
  <Card onClick={() => navigate(`blog/${slug}`)} pb={4} minWidth="350px">
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {heroImage && <CoverImage fluid={heroImage.image} height="200px" alt={heroImage.description} />}
    {text && (
    <Box m={3}>
      <div
        dangerouslySetInnerHTML={{__html: text.childContentfulRichText.html}}
      />
    </Box>
    )}
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom">
      {`${createdAt} - ${Math.ceil(readingTime)} min`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.shape({
    childContentfulRichText: PropTypes.shape({
        html: PropTypes.string,
    }
    )
  }),
  heroImage: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.shape({
      src: PropTypes.string,
    })
  }),
  slug: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
};
const edgeToArray = data => data.edges.map(edge =>
    edge.node
  );

const Writing = () => (
  <Section.Container id="writing" Background={Background}>
    <Section.Header name="Writing" icon="✍️" label="writing" />
    <StaticQuery
      query={graphql`
      query BlogPostQuery {
        allContentfulBlogPost(
        sort: {order: DESC, fields: [createdAt]},
        limit: 6) {
          edges {
            node {
              id
              title
              text: description {
                childContentfulRichText{
                  html
                }
              }
              heroImage {
                description
                image: fluid(maxWidth: 396, quality: 100) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              slug
              createdAt(formatString: "MMM YYYY")
              readingTime
              }
            }
          }
        }
      `}
      render={({ allContentfulBlogPost }) => {
        const posts = edgeToArray(allContentfulBlogPost);
        return (
          <CardContainer minWidth="350px">
            {posts.map(p => (
              <Fade bottom key={p.id}>
                <Post key={p.id} {...p} />
              </Fade>
            ))}
          </CardContainer>
        );
      }}
    />
    <Section.HeaderRoute name="All Posts >" icon="📰" label="all_posts" link='blog' mt={3} />
  </Section.Container>
);

export default Writing;
