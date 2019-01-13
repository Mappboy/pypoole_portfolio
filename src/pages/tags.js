// src/templates/tag.jsx
import React from 'react';
import {  navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Flex, Card } from 'rebass';
import styled from 'styled-components';

import Fade from 'react-reveal/Fade';
import Triangle from '../components/Triangle';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';
import Section from '../components/Section';
import { theme } from '../theme';


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

const Badge = props =>
  (
    <Card
      color='white'
      bg='primaryLight'
      {...props}
      px={3}
      py={1}
      pb={4}
      m={1}
      borderRadius={9999}
      css={{
        display: 'inline-block'
      }}
    />
  )
const StyledBadge = styled(Badge)`
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
  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
  ${props =>
    props.selected &&
    `border-bottom:  5px solid ${props.theme.colors.primaryLight}`};
`
const Tags = ({pageContext}) => {
  const { tags } = pageContext
  return (
    <Section.Container id="tags" Background={Background}>
      <Section.Header name="Tags" icon="✍️" label="tags" />
      <Flex
        m={7}
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
      >
        {tags && tags.map((tagName, index) => {
          const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
          return (
            <Fade key={tagName}>
              <StyledBadge onClick={() => navigate(`/tags/${tagName}`)}>
                {upperTag}
              </StyledBadge>
            </Fade>
          )
        })}
      </Flex>
    </Section.Container>
  )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
      tags: PropTypes.shape({
        tagName: PropTypes.string.isRequired
      })
    }).isRequired,
  };


const TagPage = ({pageContext}) => (
  <Layout>
    <Header />
    <Tags pageContext={pageContext} />
    <Footer />
  </Layout>
);
TagPage.propTypes = {
  pageContext: PropTypes.shape(
    {
      tags: PropTypes.shape({
        tagName: PropTypes.string.isRequired
    }
      )
  }
  ).isRequired,
};
export default TagPage;
