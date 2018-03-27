import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../API';
import { Link } from 'react-router-dom';

import Post from '../components/Post';

class PostsCategories extends Component {
  constructor(props) {
    super(props);
    this.sortChanged = this.sortChanged.bind(this);
    this.childChanged = this.childChanged.bind(this);
    this.getPosts();
  }
  state = {};

  getPosts() {
    fetch(
      'http://localhost:3001/' + this.props.match.params.category + '/posts',
      { method: 'GET', headers: api.header() }
    ).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.LOAD_POST,
          posts: data
        };
        this.props.load_post(object);
      });
    });
  }

  sortAscComments() {
    if (this.state.sort === 'ASC') {
      return;
    }
    let keys = Object.keys(this.props.posts);
    let posts = keys.map(key => this.props.posts[key]);
    posts.sort((a, b) => {
      if (a.voteScore < b.voteScore) {
        return -1;
      }
      if (a.voteScore > b.voteScore) {
        return 1;
      }
      return 0;
    });
    this.setState({ sort: 'ASC', sorted_posts: posts });
  }

  sortDescComments() {
    if (this.state.sort === 'DESC') {
      return;
    }

    let keys = Object.keys(this.props.posts);
    let posts = keys.map(key => this.props.posts[key]);

    posts.sort((a, b) => {
      if (a.voteScore > b.voteScore) {
        return -1;
      }
      if (a.voteScore < b.voteScore) {
        return 1;
      }

      return 0;
    });

    this.setState({ sort: 'DESC', sorted_posts: posts });
  }

  sortChanged() {
    this.setState({ sort: 'CHANGED' });
  }
  childChanged() {
    this.forceUpdate();
  }
  getKeys() {
    if (this.state.sorted_posts) {
      return this.state.sorted_posts > 0
        ? this.set.sorted_posts.filter(post => post.deleted === false)
        : false;
    }
    if (this.props.posts) {
      let array = [];
      Object.keys(this.props.posts).forEach((key, index) => {
        if (this.props.post[key].deleted === false) {
          array.push(this.props.posts[key]);
        }
      });
      return array.length > 0 ? array : false;
    } else {
      return false;
    }
  }

  render() {
    let keys = this.getKeys();
    return (
      <div className="APP">
        <div className="Banner" style={{ background: 'lightgray' }}>
          <h1> CATEGORY - {this.props.match.params.category}</h1>
        </div>
        <div>
          <button className="Home">
            <Link to="/">HOME</Link>
          </button>
          <div className="voteButtonGroup">
            <p>Sort by Vote Score</p>
            <button
              className="Ascending"
              onClick={() => {
                this.sortAscComments();
              }}
            >
              Ascending
            </button>
            <button
              className="Descending"
              onClick={() => {
                this.sortDescComments();
              }}
            >
              Descending
            </button>
          </div>
          {this.props.posts &&
            keys &&
            keys.map(post => (
              <Post
                key={post.id}
                alertParent={this.childChanged}
                sortChanged={this.sortChanged}
                post={post}
              />
            ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ posts, comments, categories }) {
  return {
    posts,
    comments,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load_post: data => dispatch(actions.load_post(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsCategories);
