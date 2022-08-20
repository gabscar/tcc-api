import { detectionController } from '../../controllers';
import { Router } from 'express';
const fs = require('fs');
const PATH_TO_ORIGINAL_IMAGES = '/images/original_images';
const route: Router = Router();
const { dirname } = require('path');

const appDir = dirname(require.main?.filename);

route.get('/images', (_req, res) => {
  console.log(appDir + '/images/original_images');
  const file = fs.readdir(
    appDir + '/images/original_images',
    (err: any, images: Buffer) => {
      if (err) console.log(err);
      console.log(images);

      return res.status(200).json(images);
    }
  );
  console.log(file);
});

route.get('/images/:image', (req, res) => {
  res.sendFile(`${appDir}/${PATH_TO_ORIGINAL_IMAGES}/${req.params.image}`);
});

route.get('/detect/:image', async (req, res) => {
  detectionController.detection(req, res);
});

export default route;
