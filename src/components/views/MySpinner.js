import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {HEIGHT, WIDTH, WIDTH_SCALE} from '../../constants/constants';
import {ptColor} from '../../constants/styles';

class MySpinner extends React.PureComponent {
  static instance = null;

  static show() {
    if (MySpinner.instance) {
      MySpinner.instance.setState({visible: true});
    }
  }

  static hide() {
    if (MySpinner.instance) {
      MySpinner.instance.setState({visible: false});
    }
  }

  constructor(props) {
    super(props);
    MySpinner.instance = this;
    this.state = {
      visible: false,
    };
  }
  render() {
    if (MySpinner?.instance?.state?.visible) {
      return (
        <Modal
          deviceWidth={WIDTH}
          deviceHeight={HEIGHT}
          backdropOpacity={1}
          animationIn="fadeInDown"
          animationInTiming={500}
          animationOutTiming={500}
          visible={MySpinner?.instance?.state?.visible}
          onRequestClose={() => MySpinner.hide()}
          onBackdropPress={() => MySpinner.hide()}
          onSwipeComplete={() => MySpinner.hide()}
          transparent={true}>
          <View
            style={[
              {...StyleSheet.absoluteFillObject},
              {
                position: 'absolute',
                width: WIDTH,
                height: HEIGHT,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              },
            ]}>
            <View
              style={{
                width: 40 * WIDTH_SCALE * 2,
                height: 40 * WIDTH_SCALE * 2,
                borderRadius: 4 * WIDTH_SCALE,
                backgroundColor: '#00000030',
              }}>
              <SkypeIndicator
                color={ptColor.appColor}
                size={40 * WIDTH_SCALE}
              />
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }
}
export default MySpinner;
