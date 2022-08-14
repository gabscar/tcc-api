import { authorization, uploadImage } from '../../middlewares';
import { Router } from 'express';
import * as multer from 'multer';
import { uploadRadiography } from '../../controllers';

const route: Router = Router();

route.post(
  '/radiography',
  [authorization, multer(uploadImage.getConfig).single('file')],
  uploadRadiography
);
export default route;
