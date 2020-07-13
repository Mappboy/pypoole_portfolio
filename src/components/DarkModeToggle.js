import React from "react";
import PropTypes from "prop-types";

import DarkModeToggle from "react-dark-mode-toggle";
import {connect} from 'react-redux';
import {toggleDarkMode} from "../state/app";

const Toggler = ({dispatch, isDarkMode}) => {

  return (
    <DarkModeToggle
      onChange={() => dispatch(toggleDarkMode(!isDarkMode))}
      checked={isDarkMode}
      size={80}
    />
  );
};


Toggler.propTypes = {
  dispatch: PropTypes.func,
  isDarkMode: PropTypes.bool.isRequired

};

export default connect(state => ({ isDarkMode: state.app.isDarkMode }), null)(Toggler);
