import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/user/login';
  const body = JSON.stringify({
    username: "lucy", 
    password: "12345678",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, body, params);
}