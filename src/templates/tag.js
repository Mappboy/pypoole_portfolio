// src/templates/tag.jsx
import React from 'react';
import {  navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Heading, Box } from 'rebass';
import styled from 'styled-components';

import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';

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

const Post = ({ title, description, heroImage, slug, createdAt, readingTime }) => (
  <Card onClick={() => navigate(`blog/${slug}`)} pb={4}>
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {heroImage && <CoverImage src={heroImage.image.src} height="200px" alt={title} />}
    {description && (
    <Box m={3} dangerouslySetInnerHTML={{__html: description.childContentfulRichText.html}} />
    )}
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom">
      {`${createdAt} - ${Math.ceil(readingTime)} min`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.shape({
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

const Tag = ({pageContext}) => {
  const { posts, tagName } = pageContext
  const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return (
    <Section.Container id="tags" Background={Background}>
      <Section.Header name="Tags" icon="✍️" label="tags" />
      <Box>
        <Heading>
          {`Posts about ${upperTag}`}
        </Heading>
        <CardContainer minWidth="300px">
          {posts.map((post) => (
            <Fade bottom key={post.id}>
              <Post key={post.id} {...post} />
            </Fade>
            ))}
        </CardContainer>
      </Box>
    </Section.Container>
  )
}

Tag.propTypes = {
    pageContext: PropTypes.shape(
      {
        posts: PropTypes.arrayOf(Post),
        tagName: PropTypes.string.isRequired
      }
    ).isRequired,
};

const TagPage = ({pageContext}) => (
  <Layout>
    <Header />
    <Tag pageContext={pageContext} />
    <Footer />
  </Layout>
);
TagPage.propTypes = {
  pageContext: PropTypes.shape(
    {
      posts: PropTypes.arrayOf(Tag),
      tagName: PropTypes.string.isRequired
    }
  ).isRequired,
};
export default TagPage;
