import appRoot from 'app-root-path';
import expressLayouts from 'express-ejs-layouts';

export const configViewEngine = app => {
  app.set('view engine', 'ejs');
  app.set('views', appRoot.toString() + '/src/views');

  app.use(expressLayouts);
  app.set('layout', appRoot.toString() + '/src/views/layouts/mainLayout.ejs');
};
