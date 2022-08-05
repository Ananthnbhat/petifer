from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PetSerializer
from .models import Pet
import base64
import os
from pathlib import Path
import uuid

BASE_DIR = Path(__file__).resolve().parent.parent
IMAGE_PATH = os.path.join(BASE_DIR, "images")

class AllPetsView(APIView):
    def get(self, request, format=None):
        pets = Pet.objects.all().order_by('name')
        serializer = PetSerializer(pets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():

            imageid = str(uuid.uuid4())

            decodedimage = base64.b64decode(serializer.validated_data['image'])
            imagepath = os.path.join(IMAGE_PATH, imageid)

            f = open(imagepath, 'w+b')
            f.write(decodedimage)
            f.close()

            serializer.validated_data['image'] = imagepath

            serializer.save()
            # if it is a lost pet -> add it to DB (and online train the ML model?)
            # if it is a found pet -> add it to DB, compare records & see for matches in DB & ML model (test phase)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
