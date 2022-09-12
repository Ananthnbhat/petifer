import base64
from .image_recognition.petmatcher import PetMatcher
from .image_recognition.extractface import ExtractFace
import os

class Ml():
    def compare(self, data, imagepath):

        print(data)
        f = open(data['image'], 'rb')
        image = f.read()
        f.close()

        encodedimage = base64.b64encode(image)

        # TODO
        # get found pet images from DB
        # found_pet_imgs = []

        modelDir = '\\api\\models\\'
        imgDir = '\\api\\testImages\\'

        # load model
        pet_matcher = PetMatcher(os.getcwd() + modelDir)
        # match pets using match(lost_pet, [found_pet1, found_pet2, found_pet3...])
        final_result = pet_matcher.match(imagepath, [os.path.join(os.getcwd() + imgDir+ '512816-3.jpg'), 
        os.getcwd() + imgDir+ '524952-2.jpg',os.getcwd() + imgDir+ '522863-1.jpg'])  
        print(final_result)
        # encode the images in the final_result.


        results = [{
            'accuracy': 1,
            'image': encodedimage,
            'id': 0,
            'latitude': "-33.865143",
            'longitude': "151.209900"
        },
        {
            'accuracy': 1,
            'image': encodedimage,
            'id': 1,
            'latitude': "-33.865143",
            'longitude': "151.209900"
        }]
        return results