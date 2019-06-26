import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Box, Text, Flex, Button } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';


import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import ImageSubtitle from '../components/ImageSubtitle';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';
import { theme } from '../theme';

// TODO Colors for headings

const cardsByCategory = {}
const projectsByCategory = {}


const Container = styled(Box)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
  }
  background: ${props => props.theme.colors.primaryDark};
  position: absolute;
  width: 100%;
`;


const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const DownloadButton = styled(Button)`
  transition: background 1s;
  cursor: pointer;
  transition-property: width;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  &:hover {
    color: ${theme.colors.whiteLight};
    background: ${theme.colors.primaryDark};
    border: ${theme.colors.primaryLight};
    top: -10px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`

const Post = ({ name, category, descriptionillustration, effect }) => (
  <Card pb={4} height={[400, 400]}>
    <EllipsisHeading m={3} p={1}>
      {name}
    </EllipsisHeading>
    {descriptionillustration && 
      (
      <Flex height={[400, 400]} width={[1, 1]} justifyContent='center' mb={2}>
        <Text height={[1, 1]} width={[0.8]} textAlign='center' justifyContent='center' p={4}>
          {descriptionillustration}
        </Text>
      </Flex>
      )
    }
    <Text p={1} mb={5} textAlign='center'>{effect}</Text>
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom">
      {`${category}`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  descriptionillustration: PropTypes.string,
  effect: PropTypes.string
};
const edgeToArray = data => data.edges.map(edge => 
    edge.node
  );

const SectionBox = styled(Box)`
  min-height: 100vh;
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: 5em 1em;
  scroll-behavior: smooth;
  `
const PD = () => (
  <SectionBox id="Public Diservice">
    <Heading color='primaryDark' ml={[2,2]}>Cards</Heading>
    <StaticQuery
      query={graphql`
      query googleSheetCardsAll {
        allGoogleSheetCardsRow {
          edges {
            node {
              id
              quantity
              name
              category
              descriptionillustration
              effect
            }
          }
        }
      }
      
      `}
      // TODO Sort by Category and Add quantities
      render={({ allGoogleSheetCardsRow }) => {
        const cards = edgeToArray(allGoogleSheetCardsRow);
        // window.cards = cards;
        // window.cBC = cardsByCategory;
        cards.forEach(card => {
            if (!cardsByCategory[card.category]) {
                cardsByCategory[card.category] = [];
          }
          cardsByCategory[card.category].push(card);
        })
        const categories = Object.keys(cardsByCategory);
        return (
            categories.map(category => {
              return (
                <Section.Container key={category} id={category} padding='2em 1em'>
                  <Section.Header name={category} label={category} mb={4} mt={1} />
                  <Flex>
                    <CardContainer id={category} minWidth="300px">
                      {cardsByCategory[category].map((card,i) => {
                        return (
                          <Fade key={card.id} bottom delay={i * 100}>
                            <Post {...card} />
                          </Fade>
                        )
                      //     [...Array(Number.parseInt(card.quantity))].map(i => {
                      //       return (
                      //         <Fade key={card.id+i.toString()} bottom delay={i * 200}>
                      //           <Post key={card.id+i.toString()} {...card} />
                      //         </Fade>
                      //       )
                      // })                 
                      }
                    )}
                    </CardContainer>
                  </Flex>
                </Section.Container>
              )
            })
          
        );
      }}
    />
  </SectionBox>
);

const PDPage = () => (
  <Layout>
    <Header />
    <Container pt={0} color='primaryDark' mt={0} p={5} />
    <PD />
    <Footer />
  </Layout>
);

export default PDPage;

