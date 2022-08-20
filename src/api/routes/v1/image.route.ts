import { Router } from 'express';
const fs = require('fs');
// const yolo = require('../../../../yolo.js');
import { detectionController } from '../../controllers';
const PATH_TO_ORIGINAL_IMAGES = '/images/original_images';
const route: Router = Router();
const { dirname } = require('path');
const appDir = dirname(require.main?.filename);

route.get('/images', (req, res) => {
  console.log(appDir + '/images/original_images');
  const file = fs.readdir(
    appDir + '/images/original_images',
    (err: any, images: File) => {
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
  // try {
  //   const pathToDetectedImage = await yolo(req.params.image);
  //   res.sendFile(pathToDetectedImage);
  // } catch (error) {
  //   console.log(error);
  // }
  detectionController.detection(req, res);
});

export default route;
