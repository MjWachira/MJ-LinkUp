import http from 'k6/http';

export const options = {
    vus: 100,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/post';
  const body = JSON.stringify({
    postDescription: "kim visited a friend",
    postImage: "image5.jpg",
    userID: "1040"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, body, params);
}