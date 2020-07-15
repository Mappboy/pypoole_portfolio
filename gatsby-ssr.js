import React from "react";
import Layout from "./src/components/Layout";

const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([<div key="single-modal" id="single-modal" />]);
};

export { onRenderBody };


const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export { wrapPageElement };

export { default as wrapRootElement } from './src/state/ReduxWrapper';
