import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import { create_comment } from './ducks/index';

import CreatePage from './components/CreatePage';
import MainPage from './components/MainPage';
import PostPage from './components/PostPage';
import CreateComment from './components/CreateComment';
import PostCategories from './components/PostCategories';
// import P from './components/MainPage';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/create/post" component={CreatePage} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route
          exact
          path="/post/:id/create_comment"
          component={CreateComment}
        />
        <Route exact path="/:category" component={PostCategories} />
        {/* <Route exact path='/post/:id'  component = {PostPage}/> */}
      </div>
    </BrowserRouter>
  </Provider>
);
root.PropTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
