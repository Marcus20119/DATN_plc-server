import getRouter from './getRouter';

const initWebRoutes = app => {
  app.use('/', getRouter);
};

export default initWebRoutes;
