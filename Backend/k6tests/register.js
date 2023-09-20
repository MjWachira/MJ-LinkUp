import http from 'k6/http';

export const options = {
    vus: 100,
    duration: '30s',
  };

export default function () {
  const url = 'http://localhost:4200/user/login';
  const body = JSON.stringify({
    fullname: "Rose",
    username: "Rose",
    profpic: "https://res.cloudinary.com/du1zkniut/image/upload/v1692710886/samples/smile.jpg",
    email: "Rose@gmail.com",
    password: "12345678"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, body, params);
}