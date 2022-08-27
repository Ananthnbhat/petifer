from django.db import models

# Create your models here.


class Pet(models.Model):
    STATUS_TUPLE = (
        ('lost', 'lost'),
        ('found', 'found'),
        ('matched', 'matched')
    )
    status = models.CharField(max_length=10, choices=STATUS_TUPLE)
    image = models.TextField(default="")

    latitude = models.TextField(default="")
    longitude = models.TextField(default="")

    def __str__(self) -> str:
        return self.name
