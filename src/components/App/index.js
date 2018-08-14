import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import HistoryContext from '../../contexts/HistoryContext';
import RouterContext from '../../contexts/RouterContext';

import App from './App';

class Wrapper extends Component {
  static propTypes = {
    // https://github.com/ReactTraining/history#properties
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
        hash: PropTypes.string.isRequired,
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
    router: PropTypes.shape({
      result: PropTypes.element.isRequired,
      generateUrls: PropTypes.func.isRequired,
      // Router Context - https://github.com/kriasoft/universal-router/blob/master/docs/api.md#context
      router: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      next: PropTypes.func.isRequired,
      pathname: PropTypes.string.isRequired,
      baseUrl: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      params: PropTypes.object.isRequired,
      keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  };

  // TODO: testar estas implementações
  shouldComponentUpdate(nextProps, nextState) {
    const {
      history: { location: currentLocation },
    } = this.props;
    const {
      history: { location: nextLocation },
    } = nextProps;

    // O componente App só deve renderizar quanto history.location for diferente
    return (
      currentLocation.pathname !== nextLocation.pathname ||
      currentLocation.search !== nextLocation.search ||
      currentLocation.hash !== nextLocation.hash
    );
  }

  render() {
    const { history, router } = this.props;
    const {
      router: { result },
    } = this.props;

    return (
      <HistoryContext.Provider value={history}>
        <RouterContext.Provider value={router}>
          <App children={result} />
        </RouterContext.Provider>
      </HistoryContext.Provider>
    );
  }
}

export default hot(module)(Wrapper);
