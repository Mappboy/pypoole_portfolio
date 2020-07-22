import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';
import {SingleModalProvider} from "../contexts/singleModalContext";

const createStore = () => reduxCreateStore(rootReducer);


// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={createStore()}><SingleModalProvider>{element}</SingleModalProvider></Provider>
);
