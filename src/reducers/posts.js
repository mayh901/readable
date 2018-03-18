import {
  LOAD_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
} from '../ducks';


export function posts(state = null, action) {
  var newPost = state;
  var posts = {};

  switch (action.type) {
    case LOAD_POST:
      for (let number in action.posts) {
        posts[action.posts[number].id] = action.posts[number];
      }
      return {
        posts
      };
    case CREATE_POST:
      newPost[action.id] = {};
      newPost[action.id].id = action.id;
      newPost[action.id].author = action.author;
      newPost[action.id].body = action.body;
      newPost[action.id].category = action.category;
      newPost[action.id].deleted = action.deleted;
      newPost[action.id].title = action.title;
      newPost[action.id].timestamp = action.timestamp;
      newPost[action.id].voteScore = action.voteScore;
      return newPost;

    case EDIT_POST:
      newPost[action.id].body = action.body;
      newPost[action.id].title = action.title;
      return newPost;

    case DELETE_POST:
      newPost[action.id].deleted = action.deleted;
      return newPost;

    case UPVOTE_POST:
      newPost[action.id].votescore = action.votescore;
      return newPost;

    case DOWNVOTE_POST:
      newPost[action.id].votescore = action.votescore;
      return newPost;

    default:
      return state;
  }
}
