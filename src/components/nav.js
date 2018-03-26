import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks/index';
import { connect } from 'react-redux';
import { Link, Route, Router } from 'react-router-dom';

class nav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showNav: 'hello'
  };
  render() {
    return (
      <div className="nav-container" style={{ border: '1px solid red' }}>
        <a className="menu-link" />
        <div style={{ display: this.state.showNav }} className="nav" />
      </div>
    );
  }
}

function mapStateToProps({ posts, comment }) {
  return {
    post,
    comments
  };
}

function mapDispatchToProps({ dispatch }) {
  return {
    post: data => dispatch(actions.post_page_load(data)),
    create_post: data => dispatch(actions.add_post(data)),
    delete_post: data => dispatch(actions.delete_post(data)),
    edit_post: data => dispatch(actions.edit_post(data)),
    downvote_post: data => dispatch(actions.downvote_post(data)),
    upvote_post: data => dispatch(actions.upvote_post(data)),
    create_comment: data => dispatch(actions.add_comment(data)),
    delete_comment: data => dispatch(actions.delete_comment(data)),
    edit_comment: data => dispatch(actions.edit_comment(data)),
    downvote_comment: data => dispatch(actions.downvote_comment(data)),
    upvote_comment: data => dispatch(actions.upvote_comment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(nav);
