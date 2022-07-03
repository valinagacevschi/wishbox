import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => (
  <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, props.style]}>
    <ActivityIndicator
      animating
      style={{ height: 180 }}
      size='large'
    />
  </View>
);

export default Spinner;
