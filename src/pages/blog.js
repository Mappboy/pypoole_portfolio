import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Box } from 'rebass';
import { StaticQuery, graphql, navigate } from 'gatsby';
import styled from 'styled-components';


import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Container from '../components/PageContainer'
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Header from '../components/NonHomeHeader';
import Footer from '../components/Footer';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '20vh']}
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

const CoverImage = styled.img`
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
  <Card onClick={() => navigate(`${slug}`)} pb={4}>
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {heroImage && <CoverImage src={heroImage.image.src} height="200px" alt={title} />}
    {text && (
    <Box m={3} dangerouslySetInnerHTML={{__html: text.childContentfulRichText.html}} />
    )}
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom">
      {`${createdAt} - ${Math.ceil(readingTime)} min`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.shape({
    childContentfulRichText: PropTypes.shape(
      {html: PropTypes.string}
    )
  }),
  heroImage: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string
    }
    )
  }),
  slug: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
};
const edgeToArray = data => data.edges.map(edge =>
    edge.node
  );

const Writing = () => (
  <Container id="writing" Background={Background}>
    <Section.Header name="Writing" icon="✍️" label="writing" />
    <StaticQuery
      query={graphql`
      query BlogPostQueryAll {
        allContentfulBlogPost(sort: {order: DESC, fields: [createdAt]}) {
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
                image: resize(width: 396, quality: 100) {
                  src
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
          <CardContainer minWidth="300px">
            {posts.map(p => (
              <Fade bottom key={p.id}>
                <Post key={p.id} {...p} />
              </Fade>
            ))}
          </CardContainer>
        );
      }}
    />
  </Container>
);


const BlogPage = () => (
  <>
    <Header />
    <Writing />
    <Footer />
  </>
);

export default BlogPage;
