import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
  vus: 3, 
  duration: '10s',
};

export default () => {
  const urlRes = http.get('http://localhost:4200/post');
  sleep(1);
  
};
