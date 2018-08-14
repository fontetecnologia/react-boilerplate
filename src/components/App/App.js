import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
      .isRequired,
  };

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}

export default App;
