// src/templates/tag.jsx
import React from 'react';
import {  navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Flex, Card, Heading, Box } from 'rebass';
import styled from 'styled-components';

import { LightSpeed, Fade } from 'react-reveal';
import Triangle from '../components/Triangle';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';
import Section from '../components/Section';
import LinkAnimated from '../components/LinkAnimated';

import { theme } from '../theme';


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
    color: ${props => props.theme.colors.whiteLight};
    background: ${props => props.theme.colors.primaryDark};
    border: ${props => props.theme.colors.primaryLight};
    top: -10px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`
const Container = styled(Flex)`
  min-height: 100vh;
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  scroll-behavior: smooth;
`
const Tags = ({pageContext}) => {
  const { tags } = pageContext
  return (

    <Container id="tags" flexDirection='col'>
      <Background />
      <Box mt={5} p={3}>
        <LightSpeed left>
          <Heading color="secondaryDark">
            <LinkAnimated selected>
              Tags
              <span role="img" aria-label='tags' style={{ marginLeft: '10px' }} alt='Tags'>
              🏷️
              </span>
            </LinkAnimated>
          </Heading>
        </LightSpeed>
      </Box>
      <Box mt={5}>
        <Flex
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          p={2}
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
      </Box>
    </Container>
  )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
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
      tags: PropTypes.arrayOf(PropTypes.string
      ).isRequired
  }
  ).isRequired,
};
export default TagPage;
