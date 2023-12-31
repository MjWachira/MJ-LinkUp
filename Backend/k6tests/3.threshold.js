import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)<200'],
  },
};

export default function () {
  http.get('http://localhost:4200/post');
}
