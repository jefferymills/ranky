import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state, ownProps);
  return {};
}

export default connect(mapStateToProps, {})(App);

App.propTypes = {};
