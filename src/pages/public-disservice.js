import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Box, Text, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';


import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import ImageSubtitle from '../components/ImageSubtitle';
import Layout from '../components/Layout';
import Header from '../components/BlogHeader';
import Footer from '../components/Footer';

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

const Post = ({ name, category, descriptionillustration, effect }) => (
  <Card pb={4} height={[400, 400]}>
    <EllipsisHeading m={3} p={1}>
      {name}
    </EllipsisHeading>
    {descriptionillustration && 
      (
      <Box height={[400, 400]} width={[1, 1]} justifyContent='center' >
        <Text height={[1, 1]} width={[0.8]} textAlign='center' justifyContent='center' p={4}>
          {descriptionillustration}
        </Text>
      </Box>
      )
    }
    <Text p={1} textAlign='center'>{effect}</Text>
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
        const cardsByCategory = {}
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
                <Section.Container key={category} id={category}>
                  <Section.Header name={category} label={category} />
                  <Flex>
                    <CardContainer id={category} minWidth="300px">
                      {cardsByCategory[category].map((card,i) => {
                        return (
                          <Fade key={card.id} bottom delay={i * 200}>
                            <Post key={card.id} {...card} />
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

