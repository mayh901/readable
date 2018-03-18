//const
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_POST = 'LOAD_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_POST';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_POST';

export const COMMENT = 'COMMENT';
export const POST = 'POST';

//action
//post actions
export function create_post({
  author,
  body,
  category,
  deleted,
  id,
  timestamp,
  title,
  voteScore
}) {
  return {
    type: CREATE_POST,
    author,
    body,
    category,
    deleted,
    id,
    timestamp,
    title,
    voteScore
  };
}
export function delete_post({ id, deleted }) {
  return {
    type: DELETE_POST,
    id,
    deleted
  };
}
export function edit_post({ body, id, title }) {
  return {
    type: EDIT_POST,
    body,
    id,
    title
  };
}
export function load_categories({ categories }) {
  return {
    type: LOAD_CATEGORIES,
    categories
  };
}
export function load_post({ posts }) {
  return {
    type: LOAD_POST,
    post
  };
}
export function downvote_post({ id, voteScore }) {
  return {
    type: DOWNVOTE_POST,
    voteScore
  };
}
export function upvote_post({ id, voteScore }) {
  return {
    type: UPVOTE_POST,
    voteScore
  };
}

//comment actions
export function create_comment({
  author,
  body,
  deleted,
  id,
  parentdelted,
  parentid,
  timestamp,
  voteScore
}) {
  return {
    type: CREATE_COMMENT,
    author,
    body,
    deleted,
    id,
    parentdelted,
    parentid,
    timestamp,
    voteScore
  };
}
export function delete_comment({ id, deleted }) {
  return {
    type: DELETE_COMMENT,
    id,
    deleted
  };
}
export function edit_comment({ body, id, title }) {
  return {
    type: EDIT_COMMENT,
    body,
    id,
    title
  };
}
export function downvote_comment({ id, voteScore }) {
  return {
    type: DOWNVOTE_COMMENT,
    voteScore
  };
}
export function upvote_comment({ id, voteScore }) {
  return {
    type: UPVOTE_COMMENT,
    voteScore
  };
}

export function comment({ post, comments }) {
  return {
    type: COMMENT,
    post,
    comments
  };
}
export function post({ post, comments }) {
  return {
    type: POST,
    post,
    comments
  };
}

//reducers

//sagas
