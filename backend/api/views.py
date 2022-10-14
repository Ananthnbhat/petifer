from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PetSerializer
from .models import Pet
from .ml import Ml
import base64
import os
from pathlib import Path
import uuid
from .image_recognition.extractface import ExtractFace
from .image_recognition.petmatcher import PetMatcher
import pickle


BASE_DIR = Path(__file__).resolve().parent.parent
IMAGE_PATH = os.path.join(BASE_DIR, "images")
FACE_DIR = os.path.join(BASE_DIR, "faces")

class TestFaceExtract(APIView):
    def get(self, request):
        return Response(ExtractFace.extract_face(request.GET["id"], request.GET["image_path"]))

class GetReq(APIView):
    def get(self,request):
        return Response(status=status.HTTP_200_OK)

class AllPetsView(APIView):
    def get(self, request, format=None):
        pets = Pet.objects.all().order_by('id')
        serializer = PetSerializer(pets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():

            imageid = str(uuid.uuid4())

            decodedimage = base64.b64decode(serializer.validated_data['image'])
            imagepath = os.path.join(IMAGE_PATH, imageid + '.jpg')

            f = open(imagepath, 'w+b')
            f.write(decodedimage)
            f.close()

            output_file = os.path.join(FACE_DIR, imageid + ".jpg")

            ExtractFace.extract_face(imageid, imagepath, output_file)

            serializer.validated_data['image'] = output_file

            if (os.path.exists(output_file) == False):
                return Response("Face image extraction failed, no entry saved", status=500)

            modelDir = '\\api\\models\\'

            # load model
            pet_matcher = PetMatcher()
            #features = pet_matcher.create_face_features_for_image_file(output_file)

            #feature_file = os.path.join(FACE_DIR, imageid + ".npy")
            #ff = open(feature_file, 'w+b')
            #ff.write(pickle.dumps(features))
            #ff.close()

            #serializer.validated_data['face_features'] = feature_file

            serializer.save()

            if serializer.data['status'] == 'lost':

                ml = Ml()
                results = ml.compare(serializer.data, imagepath)

                return Response(results, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.error_messages)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SinglePetView(APIView):
    def get_object(self, pk):
        try:
            return Pet.objects.get(pk=pk)
        except Pet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        pet = self.get_object(pk)
        serializer = PetSerializer(pet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        pet = self.get_object(pk)
        serializer = PetSerializer(pet, data=request.data)
        if serializer.is_valid():

            imageid = str(uuid.uuid4())

            decodedimage = base64.b64decode(serializer.validated_data['image'])
            imagepath = os.path.join(IMAGE_PATH, imageid)

            f = open(imagepath, 'w+b')
            f.write(decodedimage)
            f.close()

            serializer.validated_data['image'] = imagepath
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        pet = self.get_object(pk)
        pet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


