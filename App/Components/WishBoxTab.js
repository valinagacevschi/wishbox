import React from 'react';
import { connect } from 'react-redux';
import IconTab from '../Navigation/IconTab';

class FriendsTab extends React.Component {
  render() {
    const count = this.props.counters ? this.props.counters.suggested : 0;
    return <IconTab {...this.props} value={`${count}`} />;
  }
}

const mapStateToProps = state => ({
  counters: state.feed.counters,
});

export default connect(mapStateToProps)(FriendsTab);
