import React from 'react';
import PropTypes from 'prop-types';
import {Flex, Heading, Text} from 'rebass';
import {StaticQuery, graphql, Link} from 'gatsby';
import styled from 'styled-components';


import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
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


const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

export const HeadingContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  
  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.minWidth}, 1fr)
  );
  justify-items: center;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
    margin-bottom: 200px;

`;

const edgeToArray = data => data.edges.map(edge =>
    edge.node
);
const TIL = ({fields, frontmatter}) => (
  <Link to={`${fields.heading.toLowerCase()}/${frontmatter.slug}`} pb={4}>
    <Text m={3} p={1}>
      {frontmatter.title}
      {' '}
      -
      {' '}
      {frontmatter.date}
    </Text>
  </Link>
);


const TILHeading = ({group}) => (
  <>
    <EllipsisHeading m={3} p={1}>
      {group.fieldValue}
    </EllipsisHeading>

    {group.edges && edgeToArray(group).map(node => (
      <TIL key={node.id} {...node} />
        ))}
  </>
);


TIL.propTypes = {
  fields: PropTypes.shape({heading: PropTypes.string}),
    frontmatter: PropTypes.shape(
        {
            date: PropTypes.instanceOf(Date),
            slug: PropTypes.string,
            title: PropTypes.string,
        }
    ).isRequired,
};

TILHeading.propTypes = {
    group: PropTypes.arrayOf(
        PropTypes.shape({
            fieldValue: PropTypes.string,
            totalCount: PropTypes.number,
            edges: PropTypes.arrayOf(
                {
                    node: PropTypes.shape(
                        {
                          id: PropTypes.number,
                        fields: PropTypes.shape({heading: PropTypes.string}),
                        frontmatter: PropTypes.shape(
                            {
                                date: PropTypes.string,
                                slug: PropTypes.string,
                                title: PropTypes.string,
                            }
                        ).isRequired,
                        }
                    )
                }
            )
        })
    )
}



const TILSection = () => (
  <Section.Container id="til" Background={Background} p={4} pb={5}>
    <Section.Header name="TIL" icon="📚 " label="til" />
    <Text
      fontSize={[ 3, 4, 5 ]}
      textAlign="center"
      color='primary'
    >
      My latest learnings, epiphanies, and snippets...
    </Text>

    <StaticQuery
      query={graphql`
    query TILPostQueryAll {
  allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}}}, sort: {order: DESC, fields: [frontmatter___date]}) {
    group(field: fields___heading) {
      fieldValue
      totalCount
      edges {
        node {
          id
          fields {
            heading
          }
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
            slug
          }
        }
      }
    }
  }
}
`}
      render={({allMarkdownRemark}) => (
        <Flex flexDirection="column">
          <HeadingContainer minWidth="350px">
            {allMarkdownRemark.group.map((group) => (
              <Fade key={group.fieldValue}>
                <TILHeading key={group.fieldValue} group={group} />
              </Fade>
))
          }
          </HeadingContainer>
        </Flex>
            )}
    />
  </Section.Container>
);


const TILPage = () => (
  <>
    <Header />
    <TILSection />
    <Footer />
  </>
);

export default TILPage;
