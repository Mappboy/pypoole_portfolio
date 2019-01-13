import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import { Flex, Image } from 'rebass';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { navigate } from "gatsby"

import RouteLink from './RouteLink';
import Logo from './Logo/Mammoth.svg';



const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`;

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Fragment>
          <Image
            src={Logo}
            width="50px"
            alt="Portfolio Logo"
            onClick={() => navigate(`/`)}
          />  
              
          <Flex mr={[0, 3, 5]}>
            <RouteLink 
              key="home"
              onClick={() => navigate(`/`)}
              dark
            >
                Home
            </RouteLink>
            <RouteLink 
              key="blog"
              onClick={() => navigate(`/blog`)}
              dark
            >
                Blog
            </RouteLink>
            <RouteLink 
              key="tags"
              onClick={() => navigate(`/tags`)}
              dark
            >
                Tags
            </RouteLink>
          </Flex>
        </Fragment>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
