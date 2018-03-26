export function header() {
  let theHeader = new Headers();
  theHeader.append('Authorization', 'react-app-123');
  theHeader.append('Content-Type', 'application/json');

  return theHeader;
}

export function get_posts() {
  fetch('http://localhost:3001/posts', {
    method: 'GET',
    headers: header()
  }).then(function(resp) {
    resp.json().then(function(data) {
      
    });
  });
}

export function get_post(_id) {
  fetch('http://localhost:3001/posts/' + _id, {
    method: 'GET',
    headers: header()
  }).then(function(resp) {
    resp.json().then(function(data) {
     
    });
  });
}

export function get_comment(_id) {
  fetch('http://localhost:3001/comments/' + _id, {
    method: 'GET',
    headers: header()
  }).then(function(resp) {
    resp.json().then(function(data) {
     
    });
  });
}
