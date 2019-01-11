// src/pages/tags.jsx
import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types';


import RouteLink from '../components/RouteLink';


const Tags = ({pageContext}) => {
  const { tags } = pageContext
  return (
    <div>
      <ul>
        {tags && tags.map((tagName, index) => {
          return (
            <li key={tagName}>
              <RouteLink onClick={() => navigate(`/tags/${tagName}`)}>
                {tagName}
              </RouteLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
      tags: PropTypes.shape({
        tagName: PropTypes.string.isRequired
      })
    }).isRequired,
  };
export default Tags