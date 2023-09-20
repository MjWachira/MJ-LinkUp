import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  
  stages: [
    { duration: '1m', target: 2000 }, 
    { duration: '1m', target: 0 }, 
  ],
};

export default () => {
  const urlRes = http.get('http://localhost:4200/post');
  sleep(1);

};
