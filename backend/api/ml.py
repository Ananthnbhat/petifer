import base64
from .image_recognition.petmatcher import PetMatcher
from .image_recognition.extractface import ExtractFace
import os
from .models import Pet

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

        pets = Pet.objects.all().order_by('id')

        def is_found_pet(pet):
            return pet.status == 'found'

        found_pets = list(filter(is_found_pet, pets))

        if len(found_pets) == 0:
            return []

        modelDir = '\\api\\models\\'
        imgDir = '\\api\\testImages\\'

        # load model
        pet_matcher = PetMatcher()
        # match pets using match(lost_pet, [found_pet1, found_pet2, found_pet3...])
        final_result = pet_matcher.match(data, found_pets)
        ##final_result = pet_matcher.match(imagepath, [os.path.join(os.getcwd() + imgDir+ '512816-3.jpg'), 
        #os.getcwd() + imgDir+ '524952-2.jpg',os.getcwd() + imgDir+ '522863-1.jpg'])  
        
        
        #print(final_result)
        # encode the images in the final_result.

        print(len(final_result))
        results = []
        for result in final_result[:10]:
            which_pet = Pet.objects.get(id=result[0])

            f = open(which_pet.image, 'rb')
            image = f.read()
            f.close()

            encodedimage = base64.b64encode(image)

            accuracy = result[1]
            obj = {
                'accuracy': accuracy,
                'image': encodedimage,
                'id': which_pet.id,
                'latitude': which_pet.latitude,
                'longitude': which_pet.longitude
            }
            results.append(obj)
        
        return results


