import base64
from .image_recognition.petmatcher import PetMatcher

class Ml():
    def compare(self, data, imagepath):

        print(data)
        f = open(data['image'], 'rb')
        image = f.read()
        f.close()

        encodedimage = base64.b64encode(image)

        # TODO
        # found_pet_imgs = []

        # pet_matcher = PetMatcher('./models')
        # match_result = pet_matcher.match(imagepath, found_pet_imgs)  
        # encode the images in the match_result


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