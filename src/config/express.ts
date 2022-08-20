import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
const compression = require('compression');
const cors = require('cors');
import routes from '../api/routes/v1';
import { morganMiddleware } from '../api/middlewares';
import { Application } from 'express';
import { API } from '../constants';
import { specs } from './swagger';

export default function expressConfig(app: Application): Application {
  const corsOption = {
    origin: '*',
    credentials: true
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOption));
  app.use(compression());
  app.use(morganMiddleware);

  app.use(`/${API}`, routes);
  app.use(`/${API}/docs`, swaggerUi.serve, swaggerUi.setup(specs));

  return app;
}
