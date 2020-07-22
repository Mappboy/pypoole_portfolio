import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {createGlobalStyle, ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import {ScrollingProvider} from 'react-scroll-section';
import 'react-tippy/dist/tippy.css';
import config from 'react-reveal/globals';
import {darkModeTheme, lightModeTheme} from '../theme';
import Helmet from './Helmet';
import {useSingleModal} from "../contexts/singleModalContext";
import SingleModal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

body {
  margin: 0;
    background: ${props => props.theme.colors.background ? props.theme.colors.background : 'white' };
    color: ${props => props.theme.colors.color ? props.theme.colors.color : 'white' };
}
`;


config({ ssrFadeout: true });

const Layout = ({  isDarkMode, children }) => {
  const { show, toggle, content } = useSingleModal();

  return (
    <Fragment>
      <GlobalStyle theme={isDarkMode ? darkModeTheme : lightModeTheme} />
      <ThemeProvider theme={isDarkMode ? darkModeTheme : lightModeTheme}>
        <ScrollingProvider>
          <Helmet />
          {children}
          <SingleModal isOpen={show} toggle={() => toggle()} unmountOnClose={false}>
            {content}
          </SingleModal>
        </ScrollingProvider>
      </ThemeProvider>
    </Fragment>
)
}


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};


export default connect(state => ({ isDarkMode: state.app.isDarkMode }), null)(Layout);
