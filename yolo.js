const { spawn } = require('child_process');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const script = appDir + '/api/services/yolo_object_detection/yolo.py';

const yolo = (image) => {
  const inputFilePath = appDir + '/images/original_images/' + image;
  const outputFilePath = appDir + '/images//detected_images/' + image;

  const yoloProcess = spawn('python3', [script, inputFilePath, outputFilePath]);
  yoloProcess.stdout.on('data', (data) =>
    console.log('python data', data.toString())
  );

  return new Promise((resolve, reject) => {
    yoloProcess.on('close', (code) => {
      if (code === 0) {
        resolve(outputFilePath);
        console.log(code, 'code');
      } else reject();
    });
  });
};

module.exports = yolo;
