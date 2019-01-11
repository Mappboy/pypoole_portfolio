// src/templates/tag.jsx
import React from 'react'
import {  navigate} from 'gatsby'
import PropTypes from 'prop-types';
import RouteLink from '../components/RouteLink';

const Tag = ({pageContext}) => {
  const { posts, tagName } = pageContext
  return (
    <div>
      <div>
        Posts about 
        {`${tagName}`}
      </div>
      <div>
        {posts.map((post, index) => {
          return (
            <RouteLink key={post.title} onClick={()=> navigate(post.path)}>
              {post.title}
            </RouteLink>
          )
        })}
      </div>
    </div>
  )
}

Tag.propTypes = {
    pageContext: PropTypes.object.isRequired,
};
export default Tag