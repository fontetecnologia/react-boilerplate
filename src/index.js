import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import history from './history';
import router, { url as generateUrls } from './router';

const render = ({ result, context }) => {
  ReactDOM.render(
    <App history={history} router={{ result, generateUrls, ...context }} />,
    document.getElementById('root'),
  );
};

const routerResolve = location => {
  router
    .resolve(location)
    .then(render)
    .catch(() => {
      // TODO: tratar erro
    });
};

history.listen(routerResolve);
routerResolve(history.location);
