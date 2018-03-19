import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import * as api from '../api';

class Comments extends Component {

  state = {
    editor: 'none',
    input: this.props.comment.body,
    opacity: 0,
    visibility: 'hidden'
  }

  editorToggle() {
    let val = this.state.editor === 'none' ? 'block' : 'none';
    this.setState({ editor: val });
  }
  updateInput(input) {
    this.setState({ input: input });
  }
  //   TODO MAYBE
  //   confirmCommentsEdits(){

  //   }

  //HOW TO fix  comment linein fetch
 fetch(`localhost:5001/comments/${this.props.comment.id}`,
 {method: "DELETE", headers: api.headers_one()})
.then((response)=>{
    response.json().then((data)=>{
        let object={
            type:actions.EDIT_COMMENT,
            id:this.props.comment.id,
            body:data.body
        }
        this.props.edit_comment(object);
        this.editor();
        this.onSuccess();
    })
})

onSuccess(){
    this.setState({opacity:1, visibility:"visable"},()=>{
        setTimeout(() => {
           this.setState({opacity: 0, visibility:"hidden"}) 
        }, 2000);
    })
}

upVoteComment(){
    fetch("http://localhost:5001/comments/" + this.props.comment.id + "?option=upVote",
    {method: "POST", body:JSON.stringify({option: "upVote"}), headers: api.headers_one()})
    .then((response) => {
        response.json().then((data) => {
        let object = {
          type: actions.UPVOTE_COMMENT,
          id: this.props.comment.id,
          voteScore: data.voteScore
        }

        this.props.upvote_comment(object);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
}
downvoteComment() {
    fetch("http://localhost:5001/comments/" + this.props.comment.id,
    {method: "POST", body:JSON.stringify({option: "downVote"}), headers: api.headers_one()})
    .then((response) => {
        response.json().then((data) => {
        var object = {
          type: actions.DOWNVOTE_COMMENT,
          id: this.props.comment.id,
          voteScore: data.voteScore
        }

        this.props.downvote_comment(object);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
  }
  deleteComment() {
    let confirm = window.confirm("Are you sure you would like to delete?");
    if(confirm === false) {
      return;
    }

    fetch("http://localhost:5001/comments/" + this.props.comment.id,
    {method: "DELETE", headers: api.headers_one()})
    .then((response) => {

      response.json().then((data) => {
        var object = {
          type: actions.DELETE_COMMENT,
          id: data.id,
          deleted: data.deleted,
          parentDeleted: data.parentDeleted
        }

        this.props.delete_comment(object);
        if(this.props.alertParent){
          this.props.alertParent();
        }
      })
    })
  }
  render(){
return(
    <div className="comment-section">
    <h4>{this.props.comment.body}</h4>
    <h7>VOTE SCORE: {this.props.comment.voteScore}</h7>
    </br>
    <p>By: {this.props.comment.author} DATE:{new Date(this.props.commet.timestamp).toString().substr(0,16)}</p>
    
    </div>
)
  }

}
