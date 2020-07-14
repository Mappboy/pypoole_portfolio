import React from "react";

const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([<div key="single-modal" id="single-modal" />]);
};

export { onRenderBody };

export { default as wrapRootElement } from './src/state/ReduxWrapper';
