import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;

//만약 쿠키나 토큰을 사용해서 사용자의 정보를 이요하는 경우 withCredentials: true, 사용
//그리고    'Access-Control-Allow-Origin': '*',는 사용할 수 없다.
//
