import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

import routes from './routes';

const resolveRoute = (context, params) => {
  if (typeof context.route.action === 'function') {
    const result = context.route.action(context, params);
    return { result, context };
  }
  return undefined;
};

const options = {
  resolveRoute,
};

const router = new UniversalRouter(routes, options);
const url = generateUrls(router);

export { router as default, url };
