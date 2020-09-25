import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import {GOOGLE_CONFIGURE} from '../../constants/constants'
import moment from 'moment';
import { REDUX } from '../store/types';
import { Alert } from 'react-native';


const _userAuthSuccess = (dispatch,googleInfo,facebookInfo)=>{
    dispatch({
        type:REDUX.LOGGED_IN
    })

    dispatch({
        type:REDUX.GOOGLE_UPDATE_INFO,
        payload:googleInfo,
    })

    dispatch({
        type:REDUX.FACEBOOK_UPDATE_INFO,
        payload:facebookInfo
    })
}


export const LoginGoogle = async (dispatch)=>{
    GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    GoogleSignin.configure(GOOGLE_CONFIGURE)

    try {
        await GoogleSignin.hasPlayServices();
        const googleInfo = await GoogleSignin.signIn();
        console.log(googleInfo);
        _userAuthSuccess(dispatch,googleInfo)
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
}