from django.db import models


class MyUser(models.Model):
    username = models.CharField(unique=True, max_length=31)
    password = models.CharField(max_length=128)
    hash_time = models.IntegerField()

    def __str__(self):
        return self.username
