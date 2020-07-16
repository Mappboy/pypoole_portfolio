import React from "react"
import { graphql } from "gatsby"
import PropTypes from 'prop-types';
import {  Flex, Text, Box } from 'rebass';
import styled from 'styled-components';
import Section from '../components/Section';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';
import {gradient} from "../theme";


const TextContainer = styled(Text)`
  margin-bottom:40px;
  width: 100%;
  blockquote {
    margin-left: 0;
    margin-right: 1.6rem;
    margin-top: 1.6rem;
    padding-bottom: 0;
    padding-left: 0.8rem;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.6rem;
    border-left: 0.4rem solid hsla(291, 0%, 18%,0.1);
    color: hsla(291, 0%, 18%,0.8);
    font-style: italic;
  }
  blockquote p {
    display: inline;
  }
  a {
    // text-decoration: none;
    color: ${props => props.theme.colors.primaryLight};
  transition: background 1s;
  cursor: pointer;
  transition-property: width;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    top: -10px;
    text-shadow: 0 12px 16px rgba(250, 250, 2500, 0.9);
  }
    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 0;
      bottom: -5px;
      background: ${props => props.theme.colors.secondaryDark};
      height: 5px;
      transition-property: width;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
  }
`;


const CenterText = styled(Text)`
  color: ${props => props.theme.colors.primaryDark};
  z-index: 0;
  position: absolute;
  top: 60%;
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



const Wrapper = styled.div`
  background: ${gradient.rightToLeft};
  height: 300px;
  @media (max-width: 900px) {
    height: 300px;
  }
  @media (max-width: 600px) {
    height: 275px;
  }
  position: relative;
  overflow: hidden;
`;

const TILPage = ({data}) => {
const post = data.markdownRemark;
return (
  <>
    <Header />
    <Wrapper>
      <CenterText>
        <Text
          width={[1, 1, 4 / 6]}
          px={[1, 2, 4]}
          fontWeight='bold'
          fontSize={6}
        >
          {post.fields.heading} - {post.frontmatter.title}
        </Text>
      </CenterText>
    </Wrapper>
    <Section.Container id="home">
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <TextContainer
          width={[1, 1, 4 / 6]}
          px={[1, 2, 4]}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </TextContainer>
      </Flex>
    </Section.Container>
    <Footer />
    </>
);
}
TILPage.propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape(
      {
        fields: PropTypes.shape( {heading: PropTypes.string}),
        html: PropTypes.string,
        frontmatter: PropTypes.shape(
          {
            categories: PropTypes.string,
            date: PropTypes.instanceOf(Date),
            slug:PropTypes.string,
            title: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string)
          }
    ).isRequired,
  })})};

export default TILPage;
export const query = graphql`    
    query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
        html
        fields{
            heading
        }
        frontmatter {
            categories
            date
            slug
            title
            tags
        }
    }
}
`
