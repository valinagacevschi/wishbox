import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'rgba(200,200,200,0.7)',
    paddingVertical: 5,
    borderBottomWidth: 0.8,
    marginLeft: 10,
    marginRight: 10,
  },  
});
