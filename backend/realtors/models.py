from django.db import models


class Realtor(models.Model):
    name = models.CharField(max_length=200)
    photo = models.ImageField(upload_to="photos/%Y/%m/%d/")
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    top_seller = models.BooleanField(default=False)
    date_hired = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
