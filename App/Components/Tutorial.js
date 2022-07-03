import React from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import ProfileActions from '../Redux/ProfileRedux';
import Callout from '../Components/Callout';
import { tutorial } from '../Config';
import xstyles from './Styles/TutorialStyle';
import { Colors, Metrics } from '../Themes';

class Tutorial extends React.Component {
  render() {
    if (!this.props.tutorialOn) return null;
    const params = tutorial[this.props.route];
    return (
      <Callout {...params}>
        <View style={styles.mainText} >
          <Text style={{ fontSize: 16, color: Colors.snow }}>{params.text}</Text>
        </View>
        <View style={styles.switchBlock} >
          <Switch
            onValueChange={(value) => this.props.toggleTutorial(value)}
            value={this.props.tutorialOn}
          />
          <Text style={styles.mediumText} >Stop showing tutorial</Text>
          <Text style={styles.smallText} >(can be resumed from settings)</Text>
        </View>
      </Callout>
    );
  }
}

const styles = {
  ...xstyles,
  mainText: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: Metrics.screenWidth - 20,
    backgroundColor: Colors.backgroundT,
  },
  switchBlock: {
    backgroundColor: Colors.wishT, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 2,
    paddingBottom: 5,
    paddingTop: 5,
  },
  mediumText: {
    fontSize: 10.5,
  },
  smallText: {
    fontSize: 7.5,
  },
};

const mapStateToProps = (state) => ({
  tutorialOn: state.profile.tutorialOn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTutorial: data => dispatch(ProfileActions.toggleTutorial(data))
});

const areStatesEqual = (prev, next) => (
  prev.profile.tutorialOn === next.profile.tutorialOn
);

export default connect(mapStateToProps, mapDispatchToProps, null, { areStatesEqual })(Tutorial);
// export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
