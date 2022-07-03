/**
 *  @openapi
 *  /:
 *    get:
 *      summary: Main route
 *      description: Test main route
 *      tags:
 *      - main
 *      responses:
 *        200:
 *          description: Returns without error.
 */
import { Router, Request, Response } from 'express';
const { dirname } = require('path');
const appDir = dirname(require.main?.filename);
const route: Router = Router();
route.get('/', (req: Request, res: Response) => {
  console.log(appDir);
  res.sendFile(appDir + '/public/index.html');
});

export default route;
