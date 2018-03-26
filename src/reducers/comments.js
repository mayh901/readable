import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  POST,
  COMMENT
} from '../ducks/index';

export default function comments(state = null, action) {
  let comments;
  let newComment;

  switch (action.type) {
    case COMMENT:
      comments = state == null ? {} : state;
      //TODO
      if (Array.isArray(action.comments) && action.comments.length > 0) {
        for (let comment of action.comments) {
          comments[comment.id] = comment;
        }
      }
      return comments;

    case POST:
      comments = {};
      for (let number in action.comments) {
        comments[action.comments[number].id] = action.comments[number];
      }
      return comments;

    case CREATE_COMMENT:
      newComment[action.id] = {};
      newComment[action.id].id = action.id;
      newComment[action.id].author = action.author;
      newComment[action.id].body = action.body;
      newComment[action.id].category = action.category;
      newComment[action.id].deleted = action.deleted;
      newComment[action.id].title = action.title;
      newComment[action.id].timestamp = action.timestamp;
      newComment[action.id].voteScore = action.voteScore;
      return newComment;

    case EDIT_COMMENT:
      newComment[action.id].body = action.body;
      newComment[action.id].title = action.title;
      return newComment;

    case DELETE_COMMENT:
      newComment[action.id].deleted = action.deleted;
      return newComment;

    case UPVOTE_COMMENT:
      newComment[action.id].votescore = action.votescore;
      return newComment;

    case DOWNVOTE_COMMENT:
      newComment[action.id].votescore = action.votescore;
      return newComment;

    default:
      return state;
  }
}
