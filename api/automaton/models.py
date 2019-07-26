from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User


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
