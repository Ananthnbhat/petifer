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

            serializer.save()

            if serializer.data['status'] == 'lost':
                ml = Ml()
                results = ml.compare(serializer.data, imagepath)

                return Response(results, status=status.HTTP_201_CREATED)
            
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
