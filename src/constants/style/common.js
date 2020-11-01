import {Dimensions, Platform, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  heading: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: '#E54028',
    marginVertical: 10,
  },
  title: {
    width: width * 0.6,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  subtitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 3 : 0,
  },
  backButton: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  icon: {
    marginRight: 5,
    marginTop: Platform.OS === 'ios' ? 0 : 2,
    height: 15,
    width: 15,
  },
});
