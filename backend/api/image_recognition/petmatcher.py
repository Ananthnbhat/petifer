import keras
import numpy as np
import pickle as pk
from keras import backend as K
from keras.preprocessing import image
from keras.applications.efficientnet import preprocess_input
import pickle
import os

class PetMatcher:

    model_path = os.getcwd() + '\\api\\models\\'
    __efficient_net_model = keras.models.load_model(model_path + 'EfficientNet',
                                                             compile=False,
                                                             custom_objects={'K': K})
    __pca_model = pk.load(open(model_path + 'PCA.pkl','rb'))
    __svc_model = pk.load(open(model_path + 'SVC.pkl','rb'))

    #def __init__(self, model_path):
        #self.__efficient_net_model = keras.models.load_model(model_path + 'EfficientNet',
                                                         #    compile=False,
                                                        #     custom_objects={'K': K})
        #self.__pca_model = pk.load(open(model_path + 'PCA.pkl','rb'))
        #self.__svc_model = pk.load(open(model_path + 'SVC.pkl','rb'))
        # self.__image_path = image_path
    
    def match(self, pet, found_pets):
        results = {}

        pet_image = pet['image']


        pet_to_compare_face_features = self.create_face_features_for_image_file(pet_image)
        #pet_to_compare_face_features = np.load(pet['face_features'], allow_pickle=True)

        for other_pet in found_pets:
            print(other_pet)
            other_pet_image = other_pet.image
            other_pet_face_features = self.create_face_features_for_image_file(other_pet_image)
            #other_pet_face_features = np.load(other_pet.face_features, allow_pickle=True)
            face_features_pair = self.__create_face_features_pair(pet_to_compare_face_features, other_pet_face_features)

            face_features_pair = self.__pca_model.transform(face_features_pair)

            prediction = self.__svc_model.predict_proba(face_features_pair)

            results[other_pet.id] = round(prediction[0][1], 2)

            #results[other_pet_image] = round(prediction[0][1], 2)

        return sorted(results.items(), key=lambda x: x[1], reverse=True)
    
    def create_face_features_for_image_file(self, image_file):
        # image_bytes = image.load_img(self.__image_path + image_file, target_size=(260, 260))
        image_bytes = keras.utils.load_img(image_file, target_size=(260, 260))
        image_bytes = keras.utils.img_to_array(image_bytes)
        image_bytes = np.expand_dims(image_bytes, axis=0)
        image_bytes = preprocess_input(image_bytes)
        return self.__efficient_net_model.predict(image_bytes)
    
    def __create_face_features_pair(self, face_features_1, face_features_2):
        return np.concatenate((face_features_1, face_features_2), axis=1)

