
import React from "react"
import {graphql} from "gatsby"
import PropTypes from 'prop-types';
import {Flex, Text} from 'rebass';

import styled from 'styled-components';
import Section from '../components/Section';
import Header from '../components/NonHomeHeader';
import Footer from '../components/Footer';

const Color = require('color');

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
  top: 60%;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 3rem;
  text-shadow: 5px 5px 10px ${props => Color(props.theme.colors.backgroundDark).alpha(0.9)};
`;


const TILPage = ({data}) => {
    const post = data.markdownRemark;
    return (
      <>
        <Header />
        <Section.Container id="home">
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">

            <TextContainer
              width={[1, 1, 6 / 8]}
              px={[1, 2, 4]}
            >
              <CenterText
                width={[1, 1, 6 / 8]}
                px={[1, 2, 4]}
                fontWeight='bold'
                fontSize={6}
              >
                {post.fields.heading}
                {' '}
                /
                {' '}
                {post.frontmatter.title}
              </CenterText>
              <div dangerouslySetInnerHTML={{__html: post.html}} />
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
                fields: PropTypes.shape({heading: PropTypes.string}),
                html: PropTypes.string,
                frontmatter: PropTypes.shape(
                    {
                        categories: PropTypes.string,
                        date: PropTypes.instanceOf(Date),
                        slug: PropTypes.string,
                        title: PropTypes.string,
                        tags: PropTypes.arrayOf(PropTypes.string)
                    }
                ).isRequired,
            })
    })
};

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
