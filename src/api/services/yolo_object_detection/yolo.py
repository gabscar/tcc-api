import cv2 
import numpy as np
import sys
import os

# Args
input_path = sys.argv[1]
output_path = sys.argv[2]
print (os.path.realpath(__file__))
cwd = os.path.dirname(os.path.realpath(__file__)) + "/"
WEIGHTS_FILE = "/app/dist/api/s/services/yolo_object_detection/yolov3.weights"
CONFIG_FILE = "/app/dist/api/s/services/yolo_object_detection/yolov3.cfg"
CLASSES_FILE = "/app/dist/api/s/services/yolo_object_detection/coco.names"

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


font = cv2.FONT_HERSHEY_PLAIN

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
# for i in range(len(boxes)):
#     print(len(boxes),'teste')
#     if i in indexes:
#         x,y,w,h = boxes[i]
#         label = str(classes[class_ids[i]])
#         color = colors[i]
#         cv2.rectangle(img,(x,y),(x+w,y+h),color,2)
#         cv2.putText(img,label,(x,y+30),cv2.FONT_HERSHEY_SIMPLEX, 1,color,1,cv2.LINE_AA)
cv2.imwrite(output_path,img)

print(output_path)
sys.stdout.flush()