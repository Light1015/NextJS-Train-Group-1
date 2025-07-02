# cart/models.py
from django.db import models
from django.conf import settings

class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_items')
    product_id = models.IntegerField()
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()

    def __str__(self):
        return f"{self.name} ({self.user.email})"
