from django.db import models

# Create your models here.


class Pet(models.Model):
    STATUS_TUPLE = (
        ('lost', 'lost'),
        ('found', 'found'),
        ('matched', 'matched')
    )
    breed = models.CharField(max_length=20, default="")
    color = models.CharField(max_length=20, default="")
    name = models.CharField(max_length=20, default="")
    status = models.CharField(max_length=10, choices=STATUS_TUPLE)
    location = models.CharField(max_length=50, default="")

    def __str__(self) -> str:
        return self.name
