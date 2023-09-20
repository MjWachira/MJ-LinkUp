import http from 'k6/http';

export const options = {
    vus: 100,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/post/2014';
  const body = JSON.stringify({
    postDescription: "kim visited a friend",
    postImage: "image5.jpg",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.put(url, body, params);
}