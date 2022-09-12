import os
import sys
import cv2
import numpy as np
import base64
import warnings
import time
import shutil
from pathlib import Path

import torch

BASE_DIR = Path(__file__).resolve().parent.parent.parent
IMAGE_PATH = os.path.join(BASE_DIR, "images")

class ExtractFace:
    def extract_face(id, image_path):

        color_table = [(255, 0, 255)]

        output_image_folder = os.path.join(BASE_DIR, "faces")
        output_file = os.path.join(output_image_folder, id + "_head.jpg")
        model = torch.hub.load("./yolov5", "custom", path="./weights/V2/cat_and_dog.pt", source="local")
        print(output_file)
        img = cv2.imread(image_path)
        h, w = img.shape[0:2]
        #img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = model(img).pred[0].numpy()

        for i in range(len(results)):
            x1 = int(results[i][0])
            y1 = int(results[i][1])
            x2 = int(results[i][2])
            y2 = int(results[i][3])
            probility = round(results[i][4], 2)
            #category = int(results[i][5])

            if probility < 0.25:
                continue

            #retval, baseLine = cv2.getTextSize(
            #    result_text_show, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)

            #top_left = (x1, y1 - retval[1])
            #bottom_right = (top_left[0] + retval[0], top_left[1] + retval[1])

            img_head = img[y1:y2, x1:x2]
            cv2.imwrite(output_file, img_head)

            #cv2.rectangle(img, (x1, y1), (x2, y2), color_table[category], 2)

            # cv2.rectangle(img, (x1, 0), (x1, 375), (0, 255, 0), -1)
            #cv2.rectangle(img, (top_left[0], top_left[1] - baseLine), bottom_right, color_table[category], -1)



        return True



    def bboxes_iou(boxes1, boxes2):

        boxes1 = np.array(boxes1)
        boxes2 = np.array(boxes2)

        boxes1_area = (boxes1[..., 2] - boxes1[..., 0]) * \
            (boxes1[..., 3] - boxes1[..., 1])
        boxes2_area = (boxes2[..., 2] - boxes2[..., 0]) * \
            (boxes2[..., 3] - boxes2[..., 1])

        left_up = np.maximum(boxes1[..., :2], boxes2[..., :2])
        right_down = np.minimum(boxes1[..., 2:], boxes2[..., 2:])

        inter_section = np.maximum(right_down - left_up, 0.0)
        inter_area = inter_section[..., 0] * inter_section[..., 1]
        union_area = boxes1_area + boxes2_area - inter_area
        ious = np.maximum(1.0 * inter_area / union_area, np.finfo(np.float32).eps)

        return ious


    
    def nms(bboxes, iou_threshold, sigma=0.3, method='nms'):
        classes_in_img = list(set(bboxes[:, 5]))
        best_bboxes = []

        for cls in classes_in_img:
            cls_mask = (bboxes[:, 5] == cls)
            cls_bboxes = bboxes[cls_mask]

            while len(cls_bboxes) > 0:
                max_ind = np.argmax(cls_bboxes[:, 4])
                best_bbox = cls_bboxes[max_ind]
                best_bboxes.append(best_bbox)
                cls_bboxes = np.concatenate(
                    [cls_bboxes[: max_ind], cls_bboxes[max_ind + 1:]])
                iou = bboxes_iou(best_bbox[np.newaxis, :4], cls_bboxes[:, :4])
                weight = np.ones((len(iou),), dtype=np.float32)

                assert method in ['nms', 'soft-nms']

                if method == 'nms':
                    iou_mask = iou > iou_threshold
                    weight[iou_mask] = 0.0

                if method == 'soft-nms':
                    weight = np.exp(-(1.0 * iou ** 2 / sigma))

                cls_bboxes[:, 4] = cls_bboxes[:, 4] * weight
                score_mask = cls_bboxes[:, 4] > 0.
                cls_bboxes = cls_bboxes[score_mask]

        return best_bboxes

