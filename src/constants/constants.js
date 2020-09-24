import {Dimensions, NativeModules, Platform} from 'react-native';
//

const {width, height} = Dimensions.get('window');
const WIDTH = width;
const HEIGHT = height;
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';
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

const ROUTE_KEY = {
  Home: 'Home',
  Profile:'Profile',
  Setting:'Setting',
  Favorite:'Favorite',
  BottomNavigation:'BottomNavigation',
  Login:'Login'
};

export {
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
};
