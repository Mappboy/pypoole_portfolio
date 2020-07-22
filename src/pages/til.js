import React from 'react';
import PropTypes, {arrayOf} from 'prop-types';
import {Flex, Heading, Text} from 'rebass';
import {StaticQuery, graphql, navigate} from 'gatsby';
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

const edgeToArray = data => data.edges.map(edge =>
    edge.node
);
const TIL = ({fields, frontmatter}) => (
  <Text onClick={() => navigate(`${fields.heading.toLowerCase()}/${frontmatter.slug}`)} pb={4}>
    <EllipsisHeading m={3} p={1}>
      {frontmatter.title}
    </EllipsisHeading>
  </Text>
);


const TILHeading = ({group}) => (
  <>
    <Text>{group.fieldValue}</Text>
    {' '}
    -
    <Text>
      {' '}
      (
      {group.fieldCount}
      ) TILS
    </Text>
    {group.edges && edgeToArray(group.edges).map(node => (
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
Node.propTypes = {
    node: PropTypes.shape({TIL})
}
TILHeading.propTypes = {
    group: PropTypes.arrayOf(
        PropTypes.shape({
            fieldValue: PropTypes.string,
            totalCount: PropTypes.number,
            edges: PropTypes.arrayOf(
                {
                    node: PropTypes.shape(
                        {
                            TIL
                        }
                    )
                }
            )
        })
    )
}



const TILSection = () => (
  <Section.Container id="til" Background={Background}>
    <Section.Header name="TIL" icon="📚 " label="til" />
    <StaticQuery
      query={graphql`
    query TILPostQueryAll {
  allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}}}, sort: {order: ASC, fields: [frontmatter___date]}) {
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
            date
            slug
          }
        }
      }
    }
  }
}
`}
      render={({allMarkdownRemark}) => (
        <Flex minWidth="300px">
          {allMarkdownRemark.group.map((group) => (
            <Fade bottom key={group.heading}>
              <TILSection group={group} key={group.heading} />
            </Fade>
          ))}
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
