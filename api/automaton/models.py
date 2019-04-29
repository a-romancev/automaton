from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import User


class Field(models.Model):
    data = JSONField()
    user = models.ForeignKey(User, related_name='fields', on_delete=models.CASCADE)
