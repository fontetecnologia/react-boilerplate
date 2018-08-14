import React from 'react';

export default [
  {
    name: 'home',
    path: '/',
    action: () => [import(/* webpackChunkName: 'home' */ './home')],
    render: ([Home]) => <Home />,
  },
];
