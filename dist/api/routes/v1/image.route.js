"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require('fs');
const yolo = require('../../../../yolo.js');
const PATH_TO_ORIGINAL_IMAGES = '/images/original_images';
const route = (0, express_1.Router)();
const { dirname } = require('path');
const appDir = dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename);
route.get('/images', (req, res) => {
    console.log(appDir + '/images/original_images');
    const file = fs.readdir(appDir + '/images/original_images', (err, images) => {
        if (err)
            console.log(err);
        console.log(images);
        return res.status(200).json(images);
    });
    console.log(file);
});
route.get('/images/:image', (req, res) => {
    res.sendFile(`${appDir}/${PATH_TO_ORIGINAL_IMAGES}/${req.params.image}`);
});
route.get('/detect/:image', async (req, res) => {
    try {
        const pathToDetectedImage = await yolo(req.params.image);
        res.sendFile(pathToDetectedImage);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = route;
//# sourceMappingURL=image.route.js.map