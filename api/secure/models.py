from django.db import models
from django.contrib.auth.models import User

class Token(models.Model):
    user = models.ForeignKey(User, related_name='tokens', on_delete=models.CASCADE)
    key = models.CharField(max_length=64, unique=True)

