from rest_framework import serializers
from .models import CartItem
from products.models import Product  # nếu cần

class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # ✅ Sửa tại đây

    class Meta:
        model = CartItem
        fields = '__all__'
