import cv2 
import numpy as np
import sys
import os
import urllib.request
import asyncio
from concurrent.futures import ThreadPoolExecutor
_executor = ThreadPoolExecutor(1)


def sync_blocking():
    urllib.request.urlretrieve("https://github.com/gabscar/tcc-api/raw/main/src/api/services/yolo_object_detection/yolov3.weights", "yolov3.weights")


async def download(loop):
    # run blocking function in another thread,
    # and wait for it's result:
    await loop.run_in_executor(_executor, sync_blocking)

def main():
    # Args
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    cwd = os.path.dirname(os.path.realpath(__file__)) + "/"
    if os.path.isfile("yolov3.weights"):
        print('baixado')
    else:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(download(loop))
        loop.close()

    WEIGHTS_FILE = "yolov3.weights"
    CONFIG_FILE = cwd + "yolov3.cfg"
    CLASSES_FILE = cwd + "coco.names"
    sys.stdout.flush()
    net = cv2.dnn.readNet(WEIGHTS_FILE,CONFIG_FILE)

    print(net)
    classes = []
    with open(CLASSES_FILE,"r") as f:
        classes = [line.strip() for line in f.readlines()]

    colors= np.random.uniform(0,255,size=(len(classes),3))
    layer_names = net.getLayerNames()
    outputlayers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]


    img = cv2.imread(input_path)
    height,width,channels = img.shape
    blob = cv2.dnn.blobFromImage(img,0.00392,(416,416),(0,0,0),True,crop=False)
    net.setInput(blob)
    outs = net.forward(outputlayers)
    class_ids=[]
    confidences=[]
    boxes=[]
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            print(detection[0])
            if confidence > 0.5:
                center_x= int(detection[0]*width)
                center_y= int(detection[1]*height)
                w = int(detection[2]*width)
                h = int(detection[3]*height)

                
                x=int(center_x - w/2)
                y=int(center_y - h/2)

                boxes.append([x,y,w,h]) 
                confidences.append(float(confidence))
                class_ids.append(class_id) 

    idxs = cv2.dnn.NMSBoxes(boxes,confidences,0.4,0.6)



    if len(idxs) > 0:
        # loop over the indexes we are keeping
        for i in idxs.flatten():
            # extract the bounding box coordinates
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])
            # draw a bounding box rectangle and label on the image
            color = [int(c) for c in colors[class_ids[i]]]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            text = "{}: {:.4f}".format(classes[class_ids[i]], confidences[i])
            cv2.putText(img, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
                0.5, color, 2)
    cv2.imwrite(output_path,img)

    print(img)

    

main()