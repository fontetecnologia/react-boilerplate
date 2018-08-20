import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

import routes from './routes';

const resolveRoute = (context, params) => {
  const { route } = context;

  if (typeof route.action === 'function') {
    const pages = route
      .action(context, params)
      .map(x => x.then(x => x.default));

    return Promise.all(pages).then(pages => {
      return { result: route.render(pages), context };
    });
  }
  return undefined;
};

const options = {
  resolveRoute,
};

const router = new UniversalRouter(routes, options);
const url = generateUrls(router);

export { router as default, url };
