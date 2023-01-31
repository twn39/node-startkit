import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('http://localhost:3000');
  check(res, { 'success login': (r) => r.status === 200 });
}
