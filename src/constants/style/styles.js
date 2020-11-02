import {ImageBackground} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';

var {height, width} = Dimensions.get('window');

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
  // music
  containerMusic: {
    backgroundColor: '#161622',
    flex: 1,
  },
  header: {
    height: WIDTH,
    height: 50 * HEIGHT_SCALE,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161622',
    marginTop: 25 * WIDTH_SCALE,
  },
  icon: {
    padding: 20 * WIDTH_SCALE,
    color: '#FAFAFF',
  },
  textInput: {
    alignItems: 'center',
    color: '#FAFAFF',
    fontSize: 15,
    marginLeft: 5 * WIDTH_SCALE,
  },
  box1: {
    paddingVertical: 20 * WIDTH_SCALE,
    paddingHorizontal: 5 * WIDTH_SCALE,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FAFAFF',
  },
  imageBox1: {
    width: 195 * WIDTH_SCALE,
    height: 90 * HEIGHT_SCALE,
    // margin: 5,
    marginHorizontal: 5 * WIDTH_SCALE,
    marginVertical: 5 * WIDTH_SCALE,
  },
  box: {
    width: 140 * WIDTH_SCALE,
    marginHorizontal: 5 * WIDTH_SCALE,
    // backgroundColor: '#fff',
  },
  image_box: {
    width: 140 * WIDTH_SCALE,
    height: 140 * HEIGHT_SCALE,
    borderWidth: 1 * WIDTH_SCALE,
    borderColor: '#161622',
    borderRadius: 3,
  },
  box_icon: {
    width: 25 * WIDTH_SCALE,
    height: 25 * HEIGHT_SCALE,
    borderRadius: 14,
    backgroundColor: 'white',
    position: 'absolute',
    left: '75%',
    top: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: WIDTH,
    alignItems: 'center',
  },
});
