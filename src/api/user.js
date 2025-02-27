import BASE_URL from './BASE_URL';
import axios from 'axios';

const saveUser = async (token, name, photo, email, typeLogin) => {
  var json = null;

  if (typeLogin === 'fb') {
    json = JSON.stringify({
      idToken_fb: token,
      name_fb: name,
      photo_fb: photo,
    });
  } else {
    json = JSON.stringify({
      idToken_google: token,
      email_google: email,
      photo_google: photo,
      name_google: name,
    });
  }

  try {
    const res = await axios.post(`${BASE_URL}/v1/user/login`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;

  } catch (error) {
    return error;
  }
};

export default {saveUser};
