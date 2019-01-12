import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'rebass';
import { path } from 'ramda';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconLink = styled(Link)`
  transition: color 0.5s;
  color: ${path(['theme', 'colors', 'primary'])};

  &:hover {
    color: ${path(['theme', 'colors', 'primaryLight'])};
  }
`;
const plain_icons = ["envelope", "globe"]
const SocialLink = ({ fontAwesomeIcon, name, url }) => (
  <Tooltip title={name} position="bottom" trigger="mouseenter">
    <IconLink href={url} target="_blank" rel="noopener noreferrer">
      {plain_icons.includes(fontAwesomeIcon) && <FontAwesomeIcon icon={fontAwesomeIcon} /> || <FontAwesomeIcon icon={['fab', fontAwesomeIcon]} /> }
    </IconLink>
  </Tooltip>
);

SocialLink.propTypes = {
  fontAwesomeIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialLink;
