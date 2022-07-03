// import React, { PropTypes } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/AlertMessageStyles';

const AlertMessage = props => {
  const messageComponent = null;
  if (props.show) {
    const { title } = props;
    return (
      <View style={[styles.container, props.style]}>
        <View style={styles.contentContainer}>
          <Text allowFontScaling={false} style={styles.message}>
            {title && title.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
  return messageComponent;
};

export default AlertMessage;
