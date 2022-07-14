from django.db import models

# Create your models here.


class Pet(models.Model):
    breed = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    status = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name
