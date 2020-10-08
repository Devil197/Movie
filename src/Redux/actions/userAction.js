import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {GOOGLE_CONFIGURE} from '../../constants/constants';
import moment from 'moment';
import {REDUX} from '../store/types';
import {Alert} from 'react-native';

import axios from 'axios';
import USER from '../../api/user'

GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
GoogleSignin.configure({
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

const _userAuthSuccess = (dispatch, googleInfo, facebookInfo) => {
  dispatch({
    type: REDUX.LOGGED_IN,
  });

  dispatch({
    type: REDUX.GOOGLE_LOGGED_IN,
    payload: googleInfo,
  });

  dispatch({
    type: REDUX.FACEBOOK_LOGGED_IN,
    payload: facebookInfo,
  });
};

export const LoginGoogle = async (dispatch) => {
  GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  GoogleSignin.configure(GOOGLE_CONFIGURE);

  try {
    await GoogleSignin.hasPlayServices();
    const googleInfo = await GoogleSignin.signIn();
    console.log('0103->> info: ', googleInfo);
    _userAuthSuccess(dispatch, googleInfo);
  } catch (error) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('oke SIGN_IN_CANCELLED');
      GoogleSignin.signOut();
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('oke IN_PROGRESS');
      GoogleSignin.signOut();
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('oke PLAY_SERVICES_NOT_AVAILABLE');
      GoogleSignin.signOut();
    } else {
      console.log('oke oke');
      GoogleSignin.signOut();
    }
  }
};

export const LoginFacebook = async (dispatch) => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(function (
    result,
  ) {
    if (result.isCancelled) {
      console.log('Login cancelled');
    } else {
      console.log(
        'Login success with permissions: ' +
          result.grantedPermissions.toString(),
      );
      AccessToken.getCurrentAccessToken().then(async (data) => {
        let token = data.accessToken.toString();
        let urlUserInfor = `https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cpicture%7Burl%7D,email&access_token=${token}`;
        let getData = await axios.get(urlUserInfor).then((data) => {
          let name = data.data.name;
          let photo = data.data.picture.data.url;

          USER.saveUser(token, name, photo, null, 'fb').then((result) => {
            console.log(result.data);
          });
        });
      });
    }
  });
};
