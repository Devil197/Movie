import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ptColor } from '../../constants/styles';

const Divider = React.memo(
  ({ style, color, height, dash, dashColor, ...rest }) =>
    dash ? (
      <View style={[{ overflow: 'hidden', height: 1 }, style]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            marginTop: -1,
            borderWidth: 1,
            borderColor: dashColor || '#00000030',
            borderRadius: 1,
            borderStyle: 'dashed',
            overflow: 'hidden',
            zIndex: 0,
          }}
        />
      </View>
    ) : (
      <View
        style={StyleSheet.flatten([styles, style, { backgroundColor: color, height: height }])}
        {...rest}
      />
    ),
  (prevProps, nextProps) => {
    return true;
  },
);

const styles = {
  height: StyleSheet.hairlineWidth,
  backgroundColor: ptColor.divider,
};

export default Divider;
