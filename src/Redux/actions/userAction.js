import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { GOOGLE_CONFIGURE } from '../../constants/constants';
import moment from 'moment';
import { REDUX } from '../store/types';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import axios from 'axios';
import USER from '../../api/user'
import { axiosConfig } from '../../utils/api'
import { MySpinner } from '../../components/views'
GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
GoogleSignin.configure({
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

const _userAuthSuccessGoogle = (dispatch, googleInfo) => {
  dispatch({
    type: REDUX.LOGGED_IN,
  });

  dispatch({
    type: REDUX.GOOGLE_LOGGED_IN,
    payload: googleInfo,
  });

};

// const _addApiLoginGoogle = (googleInfo)=>{
//   const data:{
//     gmail:
//   }
//     axiosConfig.post(`/v1/user/login/g`,{
//       data
//     })
// }

const _userAuthSuccessFacebook = (dispatch, facebookInfo) => {
  dispatch({
    type: REDUX.LOGGED_IN,
  });


  dispatch({
    type: REDUX.FACEBOOK_LOGGED_IN,
    payload: facebookInfo,
  });
};

const _addApiLoginGoogle = (googleInfo, dispatch) => {
  console.log('1001 - check google info ',googleInfo);
  let json = JSON.stringify({
    id: googleInfo.id,
    photo: googleInfo.photo,
    name: googleInfo.name,
    token: googleInfo.token,
    gmail:googleInfo.gmail
  })
  axiosConfig.post(`/v1/user/login/g`, json, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log('1001 -> login api google ', res)
    console.log('1001 -> login api google ', res.data)
    if (res.data.position === 1.2) {
      MySpinner.hide()
      _userAuthSuccessFacebook(dispatch, res.data.items.google);
    } else {
      MySpinner.hide()
      _userAuthSuccessFacebook(dispatch, googleInfo);
    }
  })
    .catch(err => {
      MySpinner.hide()
      console.log('1001 login facebook api fail ', err.message)
    })
}

export const LoginGoogle = async (dispatch) => {
  MySpinner.show()
  GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  GoogleSignin.configure(GOOGLE_CONFIGURE);

  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn().then((googleInfo) => {
      let google_info = {
        token: googleInfo.idToken ? googleInfo.idToken : null,
        name: googleInfo.user.familyName + " " + googleInfo.user.givenName,
        photo: googleInfo.user.photo,
        gmail: googleInfo.user.email ? googleInfo.user.email : '_',
        id:googleInfo.user.id
      }
      console.log('00011 -> gg info: ', google_info);
      _addApiLoginGoogle(google_info,dispatch)
      
    })
  } catch (error) {
    MySpinner.hide()
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

const _addApiLoginFacebook = (facebookInfo, dispatch) => {
  let json = JSON.stringify({
    id: facebookInfo.id,
    photo: facebookInfo.photo,
    name: facebookInfo.name,
    token: facebookInfo.token,
    gmail:facebookInfo.gmail
  })
  axiosConfig.post(`/v1/user/login/f`, json, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log('1001 -> login api facebook ', res.data.position)
    console.log('1001 -> login api facebook ', res.data)
    if (res.data.position === 1.2) {
      MySpinner.hide()
      _userAuthSuccessFacebook(dispatch, res.data.items.facebook);
    } else {
      MySpinner.hide()
      _userAuthSuccessFacebook(dispatch, facebookInfo);
    }
  })
    .catch(err => {
      MySpinner.hide()
      console.log('1001 login facebook api fail ', err.message)
    })
}

export const LoginFacebook = async (dispatch) => {
  MySpinner.show()
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(function (
    result,
  ) {
    if (result.isCancelled) {
      console.log('Login cancelled');
      MySpinner.hide()
    } else {
      AccessToken.getCurrentAccessToken().then(async (data) => {
        let token = data.accessToken.toString();
        console.log('token facebook ', token);
        let urlUserInfor = `https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cpicture%7Burl%7D,email&access_token=${token}`;

        await axios.get(urlUserInfor).then((data) => {
          let facebookInfo = {
            gmail:data.data?.email?data.data?.email:'_',
            name: data.data.name,
            token: token,
            id: data.data?.id,
            photo: data.data?.picture?.data?.url
          }
          console.log('0003 -> facebookInfo',facebookInfo );
          _addApiLoginFacebook(facebookInfo, dispatch)
        });
      });
    }
  });
};
