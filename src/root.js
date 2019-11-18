import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";
import { FirebaseProvider } from './Redux/Firebase/firebase'

const store = configureStore()

function Root() {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <Router>
          <App />
        </Router>
      </FirebaseProvider>
    </Provider>
  );
}

export default Root;