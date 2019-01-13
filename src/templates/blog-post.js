import React from "react"
import { graphql, navigate } from "gatsby"
import PropTypes from 'prop-types';
import {  Flex, Text, Box } from 'rebass';
import styled from 'styled-components';
import Img  from 'gatsby-image';
import { path } from 'ramda';
import Section from '../components/Section';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';
import { theme, gradient, breakpoints } from '../theme';


// const Title = styled(Text)`
//   font-size: 14px;
//   font-weight: 600;
//   text-transform: uppercase;
//   display: table;
//   border-bottom: ${path(['theme', 'colors', 'primary'])} 5px solid;
// `;

const TextContainer = styled(Text)`
  margin-bottom:40px;
  width: 100%;
`;



const Wrapper = styled.div`
  -webkit-clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  @media (max-width: ${breakpoints.s}) {
    -webkit-clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
    clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
  }
  background: ${gradient.rightToLeft};
  height: 300px;
  @media (max-width: ${breakpoints.m}) {
    height: 300px;
  }
  @media (max-width: ${breakpoints.s}) {
    height: 275px;
  }
  position: relative;
  overflow: hidden;
`;

const CenterText = styled(Text)`
  color: ${theme.colors.primaryDark};
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 70rem;
  padding: 0 1rem;
  margin-bottom: 3rem;
  align-items: center;
  text-shadow: 5px 5px 10px rgba(250,250,250,0.9);
`;



const StyledLink = styled(Text)`
  text-decoration: none;
  transition: background 1s;
  cursor: pointer;
  transition-property: width;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  &:hover {
    color: ${theme.colors.whiteLight},
    background: ${theme.colors.primaryDark},
    border: ${theme.colors.primaryLight}
  }
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 0;
      bottom: -5px;
      background: ${path(['theme', 'colors', 'secondaryDark'])};
      height: 5px;
      transition-property: width;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
  text-shadow: 5px 5px 10px rgba(0,0,0,0.9);
`

const BlogPage = ({data}) => {
const post = data.contentfulBlogPost;
const image = post.heroImage.fluid;
return (   
  <Layout>
    <Header />
    <Wrapper>
      <Img fluid={image} />
      <CenterText>
        <Text 
          width={[1, 1, 4 / 6]} 
          px={[1, 2, 4]}
          fontWeight='bold'
          fontSize={6}
        >
          {post.title}
        </Text>
        <h3>{post.createdAt}</h3>

        {post.subtitle && 
          (
          <Text fontSize={4} dangerouslySetInnerHTML={{ __html:post.subtitle.childMarkdownRemark.html}} />)}
        <Flex>
          {post.tags && post.tags.map((tagName, index) => {
              const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
              return (
                <Box key={tagName} ml={[2, 3]} color="background" fontSize={[2, 3]}>
                  <StyledLink p={1} color="white" fontSize={2} onClick={() => navigate(`/tags/${tagName}`)}>{upperTag}</StyledLink>
                </Box>
              )
            })}
        </Flex>
      </CenterText>
      
    </Wrapper>
    <Section.Container id="home">
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <TextContainer
          width={[1, 1, 4 / 6]} 
          px={[1, 2, 4]}
        >
          <div dangerouslySetInnerHTML={{ __html: post.post.childContentfulRichText.html }} />
        </TextContainer>
      </Flex>
    </Section.Container>
    <Footer />
  </Layout>
);
}
BlogPage.propTypes = {
    data: PropTypes.shape({
      contentfulBlogPost: PropTypes.shape(
      {
        title: PropTypes.string,
        subtitle: PropTypes.shape({
          childMarkdownRemark: PropTypes.shape({
              html: PropTypes.string,
          }
          )
        }),
        post: PropTypes.shape({
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
        createDate: PropTypes.string.isRequired,
        readingTime: PropTypes.number.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string)
            }
    ).isRequired,
  })};

export default BlogPage;
export const query = graphql`  
query ($slug: String!) {
  contentfulBlogPost(slug: {eq: $slug}) {
    title
    slug
    readingTime
    tags
    subtitle {
      childMarkdownRemark {
        html
      }
    }
    post {
      childContentfulRichText {
        html
      }
    }
    createDate(formatString: "DD MM YYYY")
    heroImage {
      description
      fluid(maxWidth: 1920, quality: 90) {
        ...GatsbyContentfulFluid_withWebp
      }
      resize(width: 1200, quality: 90) {
        src
      }
    }
  }
}
`