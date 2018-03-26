import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';

import CreatePage from './components/CreatePage';
import MainPage from './components/MainPage';
import PostPage from './components/PostPage';
import CreateComment from './components/CreateComment';
import PostsCategories from './components/PostsCategories';
import PostCategories from './components/PostCatgories';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/create/post" component={CreatePage} />
        <Route exact path="/posts/:id" component={PostPage} />
        <Route
          exact
          path="/posts/:id/create_comment"
          component={CreateComment}
        />
        <Route exact path="/:category" component={PostsCategories} />
        <Route exact path="/:category/:post_id" component={PostCategories} />
      </div>
    </BrowserRouter>
  </Provider>
);
root.PropTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
