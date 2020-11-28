import { ImageBackground } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

var { height, width } = Dimensions.get('window');

export const ptColor = {
  appColor: '#2FA29C',
  appColorHover: '#F7F7F7',
  gray: '#A5A6AE30',
  textColor: '#585858',
  textPlaceholderColor: '#8C8C8C',
  textSubColor: '#58585870',
  borderColor: '#02030610',
  borderColor2: '#020202',
  disableButton: '#F7F7F7',
  disableText: '#00000040',
  placehoder: '#fafafa',
  divider: '#02030610',
  black: '#585858',
  white: '#ffffff',
  noWhite: '#f5f5f5',
  transparent: 'transparent',
  gray2: '#9e9d9d',
};

export const pFonts = StyleSheet.create({
  text: {
    fontFamily: 'ProductSans-Bold'
  },
  desText: {
    fontFamily: 'ProductSans-Light'
  },
  contentText: {
    fontFamily: 'Roboto-Regular'
  }
})

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '25%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: width - 300,
    paddingHorizontal: '3%',
    paddingVertical: '5%',
  },
  image_header: {
    width: '20%',
    height: '100%',
    borderRadius: 10,
  },
  box1_header: {
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  basic: {
    opacity: 0.5,
    paddingTop: 10,
  },
  icon: {
    color: '#be2edd',
    marginLeft: 5,
  },
  ////////////////////////////////////////////////////////////////

  boxWatching: {
    marginHorizontal: 10,
  },
  movie: {
    width: 230,
    height: 170,
    marginVertical: '3%',
    marginHorizontal: 10,
  },
  image_movie: {
    width: 230,
    height: 170,
    borderRadius: 10,
  },
  boxTitle: {
    position: 'absolute',
    right: '0%',
    bottom: '0%',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#7158e2',
    width: 140,
    height: 80,
    zIndex: 1,
  },
  box_icon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#e056fd',
    position: 'absolute',
    right: '6%',
    bottom: '-7%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  name_boxtitle: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7158e2',
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 1,
    color: 'white',
  },

});
