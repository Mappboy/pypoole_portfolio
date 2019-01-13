import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TagsContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    margin: 0 1rem 1rem 0;
    color: ${props => props.theme.colors.blackblue};
    padding: .3rem .6rem;
    background: ${props => props.theme.colors.whitegrey};
    border-radius: 10px;
    &:hover {
      color: ${props => props.theme.colors.whitelight};
      background: ${props => props.theme.colors.primaryLight};
      border: ${props => props.theme.colors.primaryLight};
    }
`;

const TagsBlock = ({ list }) => (
  <TagsContainer>
    {list &&
      list.map(tag => {
        const upperTag = tag.charAt(0).toUpperCase() + tag.slice(1);
        return (
          <Link key={tag} to={`/tags/${tag}`}>
            <span>{upperTag}</span>
          </Link>
        );
      })}
  </TagsContainer>
);

export default TagsBlock;

TagsBlock.propTypes = {
  list: PropTypes.shape({
    tag: PropTypes.string
  }
  ),
};