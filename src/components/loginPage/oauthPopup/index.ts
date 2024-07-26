import { baseURL } from '@/src/utils/axios';

const OauthPopup = (authType: string) => {
  window.location.href = `${baseURL}/api/auth/${authType}`;
};

export default OauthPopup;
