import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../API';
import { Link } from 'react-router-dom';

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.getCategories();
  }
  state = {
    editor: 'none',
    title: '',
    body: '',
    owner: '',
    category: ''
  };

  editorToggle() {
    let val = this.state.editor === 'none' ? 'block' : 'none';
    this.setState({ editor: val });
  }

  getCategories() {
    fetch('http://localhost:3001/categories/', {
      method: 'GET',
      headers: api.header()
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
  updateTitle(val) {
    this.setState({ title: val });
  }

  updateBody(val) {
    this.setState({ body: val });
  }

  updateCategory(val) {
    this.setState({ category: val });
  }
  postValidator() {
    if (this.state.title.length < 5) {
      return null;
    }
    if (this.state.body.length < 5) {
      return null;
    }
    // if (this.state.category === '') {
    //   return null;
    // }
    let object = {
      timestamp: Date.now(),
      title: this.state.title.trim(),
      body: this.state.body.trim(),
      author: this.state.owner,
      category: this.state.category
    };
    return JSON.stringify(object);
  }
  createPost() {
    let body = this.postValidator();
    if (body === null) {
      alert('All fields must have 5 characters');
      return;
    }

    fetch('http://localhost:3001/posts/', {
      method: 'POST',
      body: body,
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.CREATE_POST,
          id: data.id,
          timestamp: data.timestamp,
          title: data.title,
          body: data.body,
          author: this.state.owner,
          category: data.category,
          deleted: data.deleted,
          voteScore: data.voteScore
        };

        this.props.create_post(object);
        window.location.href = '/';
      });
    });
  }

  render() {
    return (
      <div className="APP">
        <div className="Banner">
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        </div>
        <div className="body">
          <div>
            <label>
              <h2>Title:</h2>
            </label>
            <input
              type="text"
              className="titleInput"
              value={this.state.title}
              onChange={e => this.updateTitle(e.target.value)}
            />
            <br />
            <label>
              <h2>Body:</h2>
            </label>
            <input
              type="text"
              className="bodyInput"
              value={this.state.body}
              onChange={e => this.updateBody(e.target.value)}
            />
            <br />
            <label>
              <h2>Category:</h2>
            </label>
            <select
              className="categoryInput"
              value={this.state.category}
              onChange={e => this.updateCategory(e.target.value)}
            >
              <option disabled> Choose One </option>
              {this.props.categories &&
                this.props.categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <br />
            <button
              className="SubmitButton"
              onClick={() => {
                this.createPost();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ categories, comments, post }) {
  return {
    categories,
    comments,
    post
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load_categories: data => dispatch(actions.load_categories(data)),
    load_post: data => dispatch(actions.load_post(data)),
    create_post: data => dispatch(actions.create_post(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
