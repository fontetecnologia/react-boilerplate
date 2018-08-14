import React from 'react';

import Link from './Link';
import HistoryContext from '../../contexts/HistoryContext';
import RouterContext from '../../contexts/RouterContext';

export default props => (
  <HistoryContext.Consumer>
    {({ push }) => (
      <RouterContext.Consumer>
        {({ generateUrls }) => (
          <Link navigate={push} generateUrls={generateUrls} {...props} />
        )}
      </RouterContext.Consumer>
    )}
  </HistoryContext.Consumer>
);
