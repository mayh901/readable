import React, { Component } from 'react';
import '../App.css';
import * as actions from '../ducks/index';
import { connect } from 'react-redux';
import * as api from '../API';
import { Link } from 'react-router-dom';

class Post extends Component {
  state = {
    sort: '',
    editor: 'none',
    body: this.props.post.body,
    title: this.props.post.title,
    opacity: 0,
    visability: 'hidden'
  };
  //TODO check action may be wrong?????
  createComments() {
    fetch('http://localhost:3001/posts/' + this.props.post.id + '/comments', {
      method: 'GET',
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        if (data.length > 0) {
          let object = {
            type: actions.COMMENT,
            posts: this.props.posts,
            comments: data
          };
          this.props.comment(object);
          this.setState({
            title: this.props.post.title,
            body: this.props.post.body
          });
        }
      });
    });
  }
  commentLength() {
    let number;
    let numberSize;

    if (Array.isArray(this.props.comment)) {
      numberSize = this.props.comments.filter(comment => {
        return (
          comment.parentsId === this.props.post.id && comment.deleted === false
        );
      });
      number = numberSize.length;
    } else {
      let keys = Object.keys(this.props.comments);
      numberSize = keys.filter(comment_id => {
        return (
          this.props.comments[comment_id].parentsId === this.props.post.id &&
          this.props.comments[comment_id].deleted === false
        );
      });
      number = numberSize.length;
    }
    return number;
  }
  editorToggle() {
    let val = this.state.editor === 'none' ? 'block' : 'none';
    this.setState({ editor: val });
  }
  updateTitle(input) {
    this.setState({ title: input });
  }
  updateBody(input) {
    this.setState({ body: input });
  }
  confirmPostEdits() {
    if (this.state.title < 5) {
      alert('Title must be 5 characters please');
      return;
    }
    if (this.state.body < 5) {
      alert('Input must be at least 5 characters');
    }
    fetch('http://localhost:3001/posts/' + this.props.post.id, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title.trim(),
        body: this.state.body.trim()
      }),
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.EDIT_POST,
          id: this.props.post.id,
          body: data.body
        };
        this.props.edit_post(object);
        this.editor();
        this.onSuccess();
      });
    });
  }
  onSuccess() {
    this.setState({ opacity: 1, visibility: 'visable' }, () => {
      setTimeout(() => {
        this.setState({ opacity: 0, visibility: 'hidden' });
      }, 2000);
    });
  }

  upvotePost() {
    fetch('http://localhost:3001/posts/' + this.props.post.id, {
      method: 'POST',
      body: JSON.stringify({ option: 'upVote' }),
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.UPVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        };

        this.props.upvote_post(object);
        this.forceUpdate();
        if (this.props.sortChanged) {
          this.props.sortChanged();
        }
      });
    });
  }

  downvotePost() {
    fetch('http://localhost:3001/posts/' + this.props.post.id, {
      method: 'POST',
      body: JSON.stringify({ option: 'downVote' }),
      headers: api.header()
    }).then(response => {
      response.json().then(data => {
        let object = {
          type: actions.DOWNVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        };

        this.props.downvote_post(object);
        this.forceUpdate();
        if (this.props.sortChanged) {
          this.props.sortChanged();
        }
      });
    });
  }
  deletePost() {
    let confirm = window.confirm(
      'Are you sure you would like to delete this post?'
    );
    if (confirm === false) {
      return;
    }

    fetch('http://localhost:3001/posts/' + this.props.post.id, {
      method: 'DELETE',
      headers: api.header()
    }).then(response => {
      let object = {
        type: actions.DELETE_POST,
        id: this.props.post.id,
        deleted: true
      };

      this.props.delete_post(object);
      if (this.props.alertParent) {
        this.props.alertParent();
      }
    });
  }
  sortAscComments() {
    if (this.state.sort === 'ASC') {
      return;
    }
    let keys = Object.keys(this.props.comments);
    let comments = keys.map(key => this.props.comments[key]);
    comments.sort((a, b) => {
      if (a.voteScore < b.voteScore) {
        return -1;
      }
      if (a.voteScore > b.voteScore) {
        return 1;
      }
      return 0;
    });
    this.setState({ sort: 'ASC', sorted_comments: comments });
  }
  sortDesComments() {
    if (this.state.sort === 'DESC') {
      return;
    }
    let keys = Object.keys(this.props.comments);
    let comments = keys.map(key => this.props.comments[key]);
    comments.sort((a, b) => {
      if (a.voteScore > b.voteScore) {
        return -1;
      }
      if (a.voteScore < b.voteScore) {
        return 1;
      }
      return 0;
    });
    this.setState({ sort: 'DESC', sorted_comments: comments });
  }
  sortChanged() {
    this.setState({ sort: 'CHANGED' });
  }
  childChange() {
    this.forceUpdate();
  }
  getKeys() {
    if (this.state.sorted_comments) {
      return this.state.sorted_comments.length > 0
        ? this.state.sorted_comments.filter(
            comment =>
              comment.deleted === false &&
              comment.parentsId === this.props.post.id
          )
        : false;
    }

    if (this.props.comments) {
      let array = [];
      Object.keys(this.props.comments).forEach((item, index) => {
        if (
          this.props.comments[item].parentsId === this.props.post.id &&
          this.props.comments[item].deleted === false
        ) {
          array.push(this.props.comments[item]);
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
      <div className="post">
        <h3>
          <Link to={'/posts/' + this.props.post.id}>
            {this.props.post.title}
          </Link>
        </h3>
        <p>{this.props.post.body}</p>
        <br />
        <p>
          Vote Score: {this.props.post.voteScore}
          <br />
          Comments: {this.props.comment && this.commentLength()}
          <br />
          Category:{' '}
          <Link to={'/' + this.props.post.category}>
            {this.props.post.category}
          </Link>
        </p>
        <p>
          By:{this.props.post.author}
          <br />
          {'Date'}:{' '}
          {new Date(this.props.post.timestamp).toString().substr(0, 16)}
          <br />
        </p>
        <button className="button-group">
          <Link to={'/posts/' + this.props.post.id + '/createComment'}>
            Add Comment
          </Link>
        </button>
        {this.props.showComments &&
          keys &&
          keys.length > 0 && (
            <div>
              <p>Sort Comments</p>
              <button
                className="AscSort"
                style={{ margin: '10px' }}
                onClick={() => {
                  this.sort_comments_byScore_asc();
                }}
              >
                Ascending
              </button>
              <button
                className="DesSort"
                style={{ margin: '10px' }}
                onClick={() => {
                  this.sort_comments_byScore_desc();
                }}
              >
                Descending
              </button>
            </div>
          )}
        <div style={{ display: this.state.displayEditor }}>
          <p>Title</p>
          <textarea
            value={this.state.title}
            onChange={e => this.updateTitle(e.target.value)}
          />
        </div>
        <p>Body</p>
        <textarea
          value={this.state.body}
          onChange={e => this.updateBody(e.target.value)}
        />
        <button
          className="Confirm-button"
          onClick={() => {
            this.confirmPostEdits();
          }}
        >
          Confirm Edit
        </button>

        <div className="post-buttons-group">
          <button
            className="Edit-Button"
            onClick={() => {
              this.editorToggle();
            }}
          >
            EDIT
          </button>
          <button
            className="Delete-Button"
            onClick={() => {
              this.deleteComment();
            }}
          >
            DELETE
          </button>
          <button
            className="UpVote-Button"
            onClick={() => {
              this.upVoteComment();
            }}
          >
            UPVOTE
          </button>
          <button
            className="DownVote-Button"
            onClick={() => {
              this.downvoteComment();
            }}
          >
            DOWNVOTE
          </button>
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
    comment: data => dispatch(actions.comment(data)),
    edit_post: data => dispatch(actions.edit_comment(data)),
    delete_post: data => dispatch(actions.delete_comment(data)),
    upvote_comment: data => dispatch(actions.upvote_comment(data)),
    downvote_comment: data => dispatch(actions.downvote_comment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
