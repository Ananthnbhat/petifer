from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Pet
        fields = ('id', 'status', 'image', 'latitude', 'longitude')
