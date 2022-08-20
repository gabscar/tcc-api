const child_process = require('child_process');
const { dirname } = require('path');
const appDir = dirname(require.main?.filename);
const script = appDir + '/api/services/yolo_object_detection/yolo.py';

export const getImagePath = (image: string) => {
  console.log(script);
  const inputFilePath = appDir + '/images/original_images/' + image;
  const outputFilePath = appDir + '/images//detected_images/' + image;

  return new Promise((resolve, reject) => {
    const yoloProcess = child_process.spawn(
      'python3',
      [script, inputFilePath, outputFilePath],
      {
        detached: true,
        stdio: 'pipe'
      }
    );
    yoloProcess.stderr.on('data', (data: any) => console.log(data.toString()));
    yoloProcess.on('close', (code: number) => {
      if (code === 0) resolve(outputFilePath);
      else reject();
    });
  });
};
