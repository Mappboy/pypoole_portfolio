import styled from 'styled-components';
import { path } from 'ramda';

const LinkAnimated = styled.span`
  text-decoration: none;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 5px;
  color: inherit;
  ${props =>
    props.selected &&
    ((props.dark &&
    `border-bottom:  5px solid ${props.theme.colors.primaryDark}`
    ) ||
    `border-bottom:  5px solid ${props.theme.colors.primaryLight}`)
  };
  transition: 0.4s;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 0;
    bottom: -5px;
    background: ${path(['theme', 'colors', 'secondaryLight'])};
    height: 5px;
    transition-property: width;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

export default LinkAnimated;
