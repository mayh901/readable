import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../API';
import { Link } from 'react-router-dom';

import Post from '../components/Post';

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.childChanged = this.childChanged.bind(this);
    this.getPosts();
  }

  getPosts() {
    fetch('http://localhost:3001/posts/', {
      method: 'GET',
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.LOAD_POST,
          posts: data
        };
        this.props.load_post(object);
      });
    });
  }
  getKeys() {
    if (this.props.post) {
      if (Array.isArray(this.props.posts)) {
        return this.props.post.length > 0
          ? this.props.posts.filter(
              post => post.id === this.props.match.params.id
            )[0]
          : false;
      } else {
        let array = [];
        Object.keys(this.props.posts).forEach((key, index) => {
          if (this.props.posts[key].deleted === false) {
            array.push(this.props.posts[key]);
          }
        });
        return array.lenght > 0
          ? array.filter(post => post.id === this.props.match.params.id)[0]
          : false;
      }
    } else {
      return false;
    }
  }
  childChanged() {
    window.location.href = '/';
  }
  render() {
    let key = this.getKeys();
    return (
      <div className="APP">
        <div className="Banner" style={{ background: 'lightgray' }}>
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        </div>
        <div className="MainBody">
          {this.props.match.params.id &&
            this.props.posts &&
            key && (
              <Post
                showComments={true}
                alertParent={this.childChanged}
                post={key}
              />
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load_post: data => dispatch(actions.load_post(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
