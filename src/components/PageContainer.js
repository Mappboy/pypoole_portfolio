import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const PageContainer = styled.div`
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
const Section = styled.div`
position: relative;
`
const DefaultBackground = () => <div />;


const Container = ({ id, children, Background = DefaultBackground, padding = '' }) => (
  <Section id={id}>
    <Background />
    <PageContainer padding={padding}>{children}</PageContainer>
  </Section>
);

Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  Background: PropTypes.func,
  padding: PropTypes.string
};

export default Container;
