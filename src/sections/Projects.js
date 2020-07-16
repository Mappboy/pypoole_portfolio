import React from 'react';
import PropTypes from 'prop-types';
import {Box, Flex, Text, Button} from 'rebass';

import {graphql, StaticQuery} from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Img from 'gatsby-image';

import {ModalBody, ModalHeader, ModalFooter, Badge} from 'reactstrap';
import {connect} from "react-redux";
import hash from "hash-it";
import Section from '../components/Section';
import {Card, CardContainer} from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';
import {useSingleModal} from "../contexts/singleModalContext";
import {techColors} from "../theme";


const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '200px';
const MODAL_HEIGHT = '400px';


const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});
  background: ${props => props.theme.colors.background ? props.theme.colors.background : 'white' };
  color: ${props => props.theme.colors.color ? props.theme.colors.color : 'white' };
  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;


const ProjectImage = styled(Img)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ModalImage = styled(Img)`
  height: ${MODAL_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${MODAL_HEIGHT} / 2);
    margin-top: calc(${MODAL_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 4px
  ); /*don't know why I have to add 4px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 4px + (${CARD_HEIGHT} / 4));
  }
`;

const ProjectModal = styled.div`
  background: ${props => props.theme.colors.background ? props.theme.colors.background : 'white' };
  color: ${props => props.theme.colors.color ? props.theme.colors.color : 'white' };
  width: 600px
  }
`;

const getColor = (props) => {
  const cleanText = props.text.toUpperCase().trim().replace(' ', '')
  const hashText = hash(cleanText)
  const colorArray = Object.values(props.theme.colors)
  const existingColor = techColors[cleanText]
  const randomColor = colorArray[hashText % colorArray.length]
  return existingColor || randomColor
}

const edgeToArray = data => data.edges.map(edge =>
  edge.node
);

const StyleBadge = styled(Badge)`
background: ${props => getColor(props)};
border-radius: 9999;
`



const Project = ({
  name,
  fullDescription,
  description,
  projectUrl,
  repositoryUrl,
  type,
  tech,
  publishedDate,
  logo
}) => {
  const { toggle, setContent, close } = useSingleModal();

  const toggleModalWithContent = (cont) => {
    setContent(cont);
    toggle();
  };
  return (
    <>
      <Card
        p={0}
        onClick={() => {
        toggleModalWithContent(() => (
          <ProjectModal>
            <ModalHeader>{name}</ModalHeader>
            <ModalBody>
              <Text width={[1]} style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html:fullDescription.childMarkdownRemark.html}} >
              </Text>
              <ModalImage fluid={logo.imageModal} alt={logo.title} />
              <Flex direction="row">
                <Text fontWeight='bold'>Tech: </Text>
                {tech.map(text => (
                  <StyleBadge
                    key={text}
                    fontWeight='bold'
                    text={text}
                    pill
                  >
                    {text}
                  </StyleBadge>
              ))}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => close()}>
                Close
              </Button>
            </ModalFooter>
          </ProjectModal>
          ));
      }}
      >
        <Flex style={{ height: CARD_HEIGHT }}>
          <TextContainer>
            <span>
              <Title
                my={2}
                pb={1}
                fontWeight='bold'
              >
                {name}
              </Title>
            </span>
            <Text width={[1]} style={{ overflow: 'auto' }}>
              {description}
            </Text>
          </TextContainer>

          <ImageContainer>
            <ProjectImage fluid={logo.image} alt={logo.title} />
            <ProjectTag>
              <Flex
                style={{
              float: 'right',
            }}
              >
                <Box mx={1} fontSize={5}>
                  <SocialLink
                    name="Check repository"
                    fontAwesomeIcon="github"
                    url={repositoryUrl}
                  />
                </Box>
                <Box mx={1} fontSize={5}>
                  <SocialLink
                    name="See project"
                    fontAwesomeIcon="globe"
                    url={projectUrl}
                  />
                </Box>
              </Flex>
              <ImageSubtitle bg="secondaryLight" color="color" y="bottom" x="right">
                {type}
              </ImageSubtitle>
              <Hide query={MEDIA_QUERY_SMALL}>
                <ImageSubtitle bg="backgroundDark" invert>
                  {publishedDate}
                </ImageSubtitle>
              </Hide>
            </ProjectTag>
          </ImageContainer>
        </Flex>
      </Card>
    </>

)};

Project.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fullDescription: PropTypes.shape( {childMarkdownRemark: PropTypes.shape(
  {html: PropTypes.string}
  )}),
  projectUrl: PropTypes.string.isRequired,
  repositoryUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  tech: PropTypes.arrayOf(PropTypes.string),
  logo: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    imageModal: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" icon="💻" Box="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
            allContentfulProject(sort: {order: DESC, fields: publishedDate}) {
              edges {
                node {
                  id
                name
                description
                fullDescription { childMarkdownRemark { html } }
                projectUrl
                repositoryUrl
                publishedDate(formatString: "YYYY")
                type
                tech
                logo {
                image: fluid(maxHeight: 200, quality: 90) {
                  ...GatsbyContentfulFluid_withWebp
                }
                imageModal: fluid {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        }
      `}
      render={({allContentfulProject}) => {
        const projects = edgeToArray(allContentfulProject)
        return (
          <CardContainer minWidth="350px">
            {projects.map((p, i) => (
              <Fade bottom delay={i * 200} key={p.id}>
                <Project key={p.id} {...p}  />
              </Fade>
            ))}
          </CardContainer>
        )}
      }
    />
  </Section.Container>
  );

export default connect(state => ({ modal: state.app.modal }), null)(Projects);

