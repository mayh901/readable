import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../api';
import { Link } from 'react-router-dom';

import Post from '../components/Post';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.sortChanged = this.sortChanged.bind(this);
    this.childChanged = this.sortChanged.bind(this);
    this.getCategories();
    this.getPosts();
  }
  state = {
    sort: ''
  };

  getCategories() {
    fetch('http://localhost:5001/categories/', {
      method: 'GET',
      headers: api.headers_one()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.LOAD_POST,
          categories: data.categories
        };
        this.props.load_categories(object);
      });
    });
  }

  getPosts() {
    fetch('http://localhost:5001/posts/', {
      method: 'GET',
      headers: api.headers_one()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.LOAD_POST,
          post: data
        };
        this.props.load_post(object);
      });
    });
  }
  sortAscPost() {
    if (this.state.sort == 'ASC') {
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
  sortDesPost() {
    if (this.state.sort == 'DESC') {
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
  childChanged() {
    this.forceUpdate();
  }

  sortChanged() {
    this.setState({ sort: 'CHANGED' });
  }
  getKeys() {
    if (this.state.sorted_posts) {
      return this.state.sorted_post.length > 0
        ? this.state.sorted_post.filter(post => post.deleted === false)
        : false;
    }

    if (this.props.post) {
      let array = [];
      Object.keys(this.props.post).forEach((item, index) => {
        if (this.props.post[item].deleted === false) {
          array.push(this.props.post[item]);
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
        <div className="Banner">
          <h1>UDACITY READABLE -- Hannah May</h1>
        </div>
        <div className="MAIN">
          <div>
            <button className="CreatePost">
              <Link to="/create/post">Create Post</Link>
            </button>
            <p>Sort by Vote Score</p>
            <button
              className="ascending"
              onClick={() => {
                this.sortAscPost();
              }}
            >
              Ascending
            </button>
            <button
              className="descending"
              onClick={() => {
                this.sortDescPost();
              }}
            >
              Descending
            </button>
          </div>
          <h2>POSTS</h2>
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
    load_categories: data => dispatch(actions.load_categories(data)),
    load_post: data => dispatch(actions.load_post(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
