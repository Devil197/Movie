import { Dimensions, Platform, StatusBar } from 'react-native';
//

const { width, height } = Dimensions.get('window');
const WIDTH = width;
const HEIGHT = height;
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
const STATUS_BAR_CURRENT_HEIGHT = IS_IOS ? 20 : StatusBar.currentHeight;
const HEADER_HEIGHT = 50;
// Use iPhone6 as base size which is 375 x 667
const baseWidth = 398;
const baseHeight = 736;
const WIDTH_SCALE = Math.min(width / baseWidth, height / baseHeight);
const HEIGHT_SCALE = height / baseHeight;
const PAGING_LIMIT = 5;
const headerHeight = 56 * HEIGHT_SCALE;
const iconSize = 20 * WIDTH_SCALE;
const heightBottomBar = 69 * HEIGHT_SCALE;
const textInputHeight = 36 * HEIGHT_SCALE;
const heightButton = 50 * HEIGHT_SCALE;
const avatarSize = 50 * WIDTH_SCALE;
const URL = 'https://ph2t.herokuapp.com';
const API_KEY = {
  1: 'AIzaSyCpU2RlaMjkFN0461dZRv2zfnQEXzUuz6U',
  2: 'AIzaSyAstEmHpjVSNtJZ0sf4HK-CV3gXlTbhsVo',
  3: 'AIzaSyAuJ3n_8KEAcR0ip82qAy816VY5sjGBi-s',
};
const GOOGLE_CONFIGURE = {
  webClientId:
    '835610037209-t6p9r8dedt7e7m8hh302br39es9ctfe7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below
};
const ASYNC_TYPE = {
  GOOGLE: 'g',
  FACEBOOK: 'f',
};

const dataCarousel = [0, 1, 2, 3, 4]
const typeNotification = {
  MOVIE: 'movie',
  MUSIC: 'music',
  CAST: 'cast',
  VIDEO: 'video'
}

const followType = {
  cast: 'cast',
  movie: 'movie'
}


const ROUTE_KEY = {
  Splash: 'Splash',
  Film: 'Film',
  Profile: 'Profile',
  Setting: 'Setting',
  Favorite: 'Favorite',
  BottomNavigation: 'BottomNavigation',
  Login: 'Login',
  Home: 'Home',
  Videos: 'Videos',
  Music: 'Music',
  Category: 'Category',
  Follow: 'Follow',
  Details: 'Details',
  History: 'History',
  Search: 'Search',
  Setting: 'Setting',
  Notification: 'Notification',
  Introduce: 'Introduce',
  Actor: 'Actor',
  Players: 'Players',
};

export {
  followType,
  WIDTH,
  WIDTH_SCALE,
  HEIGHT,
  HEIGHT_SCALE,
  IS_ANDROID,
  iconSize,
  IS_IOS,
  baseHeight,
  baseWidth,
  PAGING_LIMIT,
  Platform,
  headerHeight,
  height,
  width,
  textInputHeight,
  heightBottomBar,
  heightButton,
  avatarSize,
  ROUTE_KEY,
  URL,
  ASYNC_TYPE,
  API_KEY,
  STATUS_BAR_CURRENT_HEIGHT,
  HEADER_HEIGHT,
  dataCarousel,
  typeNotification
};
