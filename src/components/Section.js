import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Section } from 'react-scroll-section';
import { Heading } from 'rebass';
import PropTypes from 'prop-types';
import Slide from 'react-reveal/Slide';
import LinkAnimated from './LinkAnimated';

const SectionContainer = styled.div`
  min-height: 100vh;
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: ${props => 
    props.padding || 
    '5em 1em'};
  scroll-behavior: smooth;
  background: ${props => props.theme.background};
`;

const DefaultBackground = () => <div />;

const Container = ({ id, children, Background = DefaultBackground, padding = '' }) => (
  <Section id={id} style={{ position: 'relative' }}>
    <Background />
    <SectionContainer padding={padding}>{children}</SectionContainer>
  </Section>
);

Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  Background: PropTypes.func,
  padding: PropTypes.string
};

const Header = ({ name, icon = '', label = '', mb=4}) => (
  <Slide left>
    <Heading color="secondaryDark" mb={mb}>
      <LinkAnimated selected>
        {name}
        {icon && (
          <span role="img" aria-label={label} style={{ marginLeft: '10px' }} alt={name}>
            {icon}
          </span>
        )}
      </LinkAnimated>
    </Heading>
  </Slide>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  mb: PropTypes.number
};

const HeaderRoute = ({ name, icon = '', label = '', link}) => (
  <Slide right>
    <Heading color="secondaryDark" mb={4} mt={3} textAlign='right' mr={[4, 4]}>
      <LinkAnimated onClick={()=> navigate(link)}>
        {name}
        {icon && (
          <span role="img" aria-label={label} style={{ marginLeft: '10px' }} alt={name}>
            {icon}
          </span>
        )}
      </LinkAnimated>
    </Heading>
  </Slide>
);

HeaderRoute.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string
};
export default {
  Container,
  Header,
  HeaderRoute
};
