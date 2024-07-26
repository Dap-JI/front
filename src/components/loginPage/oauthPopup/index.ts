import { baseURL } from '@/src/utils/axios';
import { useEffect } from 'react';

const OauthPopup = (authType: string) => {
  const name = 'LoginPopup';
  const width = 500;
  const height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const options = `width=${width},height=${height},top=${top},left=${left}`;
  (window.location.href = `${baseURL}/api/auth/${authType}`), name, options;
};

export default OauthPopup;
