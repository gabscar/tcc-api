import { Request, Response } from 'express';
const { spawn } = require('child_process');
import * as path from 'path';

const fs = require('fs');

const appDir = `${path.join(__dirname, '..', '..')}`;
const script = appDir + '/api/services/yolo_object_detection/yolo.py';

export async function detection(req: Request, res: Response): Promise<void> {
  const params = {
    inputFilePath: appDir + '/images/original_images/' + req.params.image,
    outputFilePath: appDir + '/images/detected_images/' + req.params.image
  };
  console.log(params);

  const yoloProcess = spawn('python3', [
    script,
    params.inputFilePath,
    params.outputFilePath
  ]);
  yoloProcess.stdout.on('data', (data: any) => {
    console.log(data);
  });

  yoloProcess.on('close', (code: any) => {
    if (code === 0) {
      fs.readFile(params.outputFilePath, function (err: any, data: any) {
        if (err) throw err; // Fail if the file can't be read.
        console.log('Data:', data);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data); // Send the file data to the browser.
      });
    } else res.status(403).send({ message: 'detection failed' });
  });
}
