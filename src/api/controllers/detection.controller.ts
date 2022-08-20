import { getImagePath } from '../utils/imagePathExtraction';
import { Request, Response } from 'express';

const fs = require('fs');

export async function detection(req: Request, res: Response): Promise<void> {
  try {
    const outputPath = await getImagePath(req.params.image);
    fs.readFile(outputPath, function (err: any, data: any) {
      if (err) throw err; // Fail if the file can't be read.
      console.log('Data:', data);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data); // Send the file data to the browser.
    });
  } catch {
    res.status(403).send({ message: 'detection failed' });
  }
}
