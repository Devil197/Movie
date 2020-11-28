import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { GOOGLE_CONFIGURE, ASYNC_TYPE } from '../../constants/constants';
import moment from 'moment';
import { REDUX } from '../store/types';
import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import axios from 'axios';
import USER from '../../api/user';
import { axiosConfig } from '../../utils/api';
import { MySpinner } from '../../components/views';
GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
GoogleSignin.configure({
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

const _userAuthSuccessGoogle = (dispatch, googleInfo, userInfo) => {
  dispatch({
    type: REDUX.LOGGED_IN,
  });

  dispatch({
    type: REDUX.GOOGLE_LOGGED_IN,
    payload: googleInfo,
  });

  dispatch({
    type: REDUX.ADD_USER_INFO,
    payload: userInfo,
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

const _userAuthSuccessFacebook = (dispatch, facebookInfo, userInfo) => {
  dispatch({
    type: REDUX.LOGGED_IN,
  });

  dispatch({
    type: REDUX.FACEBOOK_LOGGED_IN,
    payload: facebookInfo,
  });

  dispatch({
    type: REDUX.ADD_USER_INFO,
    payload: userInfo,
  });
};

export const _addApiLoginGoogle = (googleInfo, dispatch) => {
  console.log('1001 - check google info ', googleInfo);
  let json = JSON.stringify({
    google_id: googleInfo?.id,
    google_name: googleInfo?.name,
    google_token: googleInfo?.token,
    google_photo: googleInfo?.photo,
    google_gmail: googleInfo?.gmail,
  });
  axiosConfig
    .post(`/v1/user/login/g`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.data.result) {
        console.log('1001 -> login api google ', res.data?.items[0]);
        if (res.data.items?.facebook_id !== 'not null') {
          _userAuthSuccessGoogle(dispatch, googleInfo, res.data?._id);
          const facebookInfo = {
            id: res.data?.items[0].facebook_id,
            gmail: res.data?.items[0].facebook_gmail,
            name: res.data?.items[0].facebook_name,
            token: res.data?.items[0].facebook_token,
            photo: res.data?.items[0].facebook_photo,
          };
          dispatch({
            type: REDUX.FACEBOOK_LOGGED_IN,
            payload: facebookInfo,
          });
        } else {
          _userAuthSuccessGoogle(dispatch, googleInfo, res.data?._id);
        }
        MySpinner.hide();
      } else {
        MySpinner.hide();
        Alert.alert('Login Google fail ~~');
      }
    })
    .catch((err) => {
      MySpinner.hide();
      console.log('1001 login facebook api fail ', err);
    });
};

export const LoginGoogle = () =>
  new Promise((resolve, reject) => {
    MySpinner.show();
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    GoogleSignin.configure(GOOGLE_CONFIGURE);

    try {
      GoogleSignin.hasPlayServices();
      GoogleSignin.signIn().then((googleInfo) => {
        let google_info = {
          token: googleInfo.idToken ? googleInfo.idToken : null,
          name: googleInfo.user.familyName + ' ' + googleInfo.user.givenName,
          photo: googleInfo.user.photo,
          gmail: googleInfo.user.email ? googleInfo.user.email : '_',
          id: googleInfo.user.id,
        };
        console.log('00011 -> gg info: ', google_info);
        resolve(google_info);
      });
    } catch (error) {
      MySpinner.hide();
      console.log(error);
      reject(error);
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
  });

export const _addApiLoginFacebook = (facebookInfo, dispatch) => {
  console.log('1001 facebook_id ', facebookInfo.id);
  let json = JSON.stringify({
    facebook_id: facebookInfo?.id,
    facebook_name: facebookInfo?.name,
    facebook_token: facebookInfo?.token,
    facebook_photo: facebookInfo?.photo,
    facebook_gmail: facebookInfo?.gmail,
  });
  axiosConfig
    .post(`/v1/user/login/f`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.data.result) {
        if (res.data.items.google_id !== 'not null') {
          _userAuthSuccessFacebook(dispatch, facebookInfo, res.data?.items[0]);
          const googleInfo = {
            id: res.data?.items[0].google_id,
            gmail: res.data?.items[0].google_gmail,
            name: res.data?.items[0].google_name,
            token: res.data?.items[0].google_token,
            photo: res.data?.items[0].google_photo,
          };
          dispatch({
            type: REDUX.GOOGLE_LOGGED_IN,
            payload: googleInfo,
          });
        } else {
          _userAuthSuccessFacebook(dispatch, facebookInfo, res.data?.items);
        }
        MySpinner.hide();
      } else {
        MySpinner.hide();
        Alert.alert('Login Facebook fail ~~');
      }
    })
    .catch((err) => {
      MySpinner.hide();
      console.log('1001 login facebook api fail ', err.message);
    });
};

export const LoginFacebook = () =>
  new Promise((resolve, reject) => {
    MySpinner.show();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
          MySpinner.hide();
        } else {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            let token = data.accessToken.toString();
            console.log('token facebook ', token);
            let urlUserInfor = `https://graph.facebook.com/v6.0/me?fields=id%2Cname%2Cpicture%7Burl%7D,email&access_token=${token}`;

            axios
              .get(urlUserInfor)
              .then((data) => {
                let facebookInfo = {
                  gmail: data.data?.email ? data.data?.email : 'chưa có',
                  name: data.data.name,
                  token: token,
                  id: data.data?.id,
                  photo: data.data?.picture?.data?.url,
                };
                resolve(facebookInfo);
              })
              .catch((err) => reject(err));
          });
        }
      },
    );
  });

export const _asyncUser = async (type, invite_id, dispatch) => {
  MySpinner.show();
  if (type === ASYNC_TYPE.FACEBOOK) {
    LoginFacebook().then(async (res) => {
      let json = JSON.stringify({
        facebook_id: res?.id,
        facebook_name: res?.name,
        facebook_token: res?.token,
        facebook_photo: res?.photo,
        facebook_gmail: res.gmail ? res.gmail : 'không có',
      });
      console.log('1002 res ', res);
      await axiosConfig
        .post(`/v4/user/async/${type}/${invite_id}`, json, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => {
          if (data.data.result) {
            MySpinner.hide();
            Alert.alert('Liên kết tài khoản Facebook thành công !'),
              dispatch({
                type: REDUX.FACEBOOK_LOGGED_IN,
                payload: res,
              });
          } else if (data.data?.position === 400) {
            MySpinner.hide();
            Alert.alert('Tài Khoản Facebook này đã được sử dụng !');
            LoginManager.logOut();
          } else {
            MySpinner.hide();
            Alert.alert('Liên kết tài khoản Facebook thất bại !~~');
          }
        });
    });
  } else if (type === ASYNC_TYPE.GOOGLE) {
    LoginGoogle()
      .then(async (res) => {
        console.log('1001 async id gg ', res.id);
        let json = JSON.stringify({
          google_id: res.id,
          google_name: res.name,
          google_token: res.token ? res.token : 'không có',
          google_photo: res.photo,
          google_gmail: res.gmail,
        });
        console.log('1001 json gg ', json);

        await axiosConfig
          .post(`/v4/user/async/${type}/${invite_id}`, json, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((data) => {
            if (data.data.result) {
              MySpinner.hide();
              Alert.alert('Liên kết tài khoản google thành công !'),
                dispatch({
                  type: REDUX.GOOGLE_LOGGED_IN,
                  payload: res,
                });
            } else if (data.data?.position === 400) {
              MySpinner.hide();
              Alert.alert('Tài Khoản google này đã được sử dụng !');
              LoginManager.logOut();
            } else {
              MySpinner.hide();
              Alert.alert('Liên kết tài khoản google thất bại !~~');
            }
          });
      })
      .catch((e) => Alert.alert('Không thể đăng nhập google !~~'));
  } else {
    Alert.alert('Lỗi đồng bộ');
  }
};
