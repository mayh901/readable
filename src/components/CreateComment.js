import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks';
import { connect } from 'react-redux';
import * as api from '../API';
import { Link } from 'react-router-dom';
import * as tools from '../random';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.setState({ component: 'Create Comment' });
  }

  state = {
    body: '',
    owner: 'Hannah'
  };

  updateBody(value) {
    this.setState({ body: value });
  }

  CommentsValidator() {
    if (this.state.body.length < 5) {
      return null;
    }

    var object = {
      id: tools.random(),
      timestamp: Date.now(),
      body: this.state.body.trim(),
      author: this.state.owner,
      parentId: this.props.match.params.id
    };
    return JSON.stringify(object);
  }

  createComment() {
    let body = this.CommentsValidator();
    if (body === null) {
      alert('Comments must be a least 5 characters please');
      return;
    }

    fetch('http://localhost:3001/comments', {
      method: 'POST',
      body: body,
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.CREATE_COMMENT,
          id: data.id,
          timestamp: data.timestamp,
          body: data.body,
          author: this.state.owner,
          parentId: data.parentId,
          deleted: data.deleted,
          voteScore: data.voteScore,
          parentDeleted: data.parentDeleted
        };

        this.props.create_comment(object);
        window.location.href = '/posts/' + this.props.match.params.id;
      });
    });
  }

  render() {
    return (
      <div className="APP">
        <div className="banner">
          <h1>
            <Link to="/">HOME</Link>
          </h1>
        </div>
        <div>
          <div className="comment area">
            <br />
            <Link to={'/posts/' + this.props.match.params.id}>
              Back To Post
            </Link>
            <br />
            <br />
            <br />
            <br />
            <label>
              <span style={{ marginRight: '10px' }}>Body:</span>
            </label>
            <textarea
              className="textArea"
              value={this.state.body}
              onChange={e => this.updateBody(e.target.value)}
            />

            <br />
            <br />
            <button
              className="submitButton"
              onClick={() => {
                this.createComment();
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

function mapStateToProps({ posts, comments, categories }) {
  return {
    posts,
    comments,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    create_comment: data => dispatch(actions.create_comment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
