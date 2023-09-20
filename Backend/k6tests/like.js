import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/post/like';
  const body = JSON.stringify({
    postID: "11",
    userID: "36"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, body, params);
}