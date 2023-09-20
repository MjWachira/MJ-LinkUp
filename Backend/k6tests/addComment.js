import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/comment';
  const body = JSON.stringify({
    commentDescription: "say no hi to friend",
    postID: "2055",
    userID: "1059"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, body, params);
}