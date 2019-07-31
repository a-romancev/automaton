from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Field(models.Model):
    data = JSONField()
    user = models.ForeignKey(User, related_name='fields', on_delete=models.CASCADE)
    name = models.TextField()
    color = models.CharField(max_length=15, null=True)
    mutator = models.ForeignKey('Mutator', related_name='fields', on_delete=models.SET(None), null=True)


class Mutator(models.Model):
    rules = JSONField(default=list())
    user = models.ForeignKey(User, related_name='mutators', on_delete=models.CASCADE)
    name = models.TextField()


class FieldRating(models.Model):
    field = models.ForeignKey('Field', related_name='field_ratings', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='field_ratings', on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)], null=True)

    class Meta:
        unique_together = (("field", "user"),)

