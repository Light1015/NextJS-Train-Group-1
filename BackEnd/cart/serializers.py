from rest_framework import serializers
from .models import Cart, CartItem
from products.models import Product
from decimal import Decimal
# ✅ Chỉ lấy các field có thật từ model Product
# cart/serializers.py
class ProductSerializer(serializers.ModelSerializer):
    colors = serializers.StringRelatedField(many=True)
    sizes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'colors', 'sizes']

# cart/serializers.py
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    color = serializers.StringRelatedField()  # ✅ dùng để hiển thị tên color
    size = serializers.StringRelatedField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'color', 'size', 'total_price']

    def get_total_price(self, obj):
        return float(obj.quantity) * float(obj.product.price)


class CartSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()
    delivery_fee = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'subtotal', 'discount', 'delivery_fee', 'total']

    def get_items(self, obj):
        items = CartItem.objects.filter(cart=obj)
        return CartItemSerializer(items, many=True).data

    def get_subtotal(self, obj):
        items = CartItem.objects.filter(cart=obj)
        return sum(item.quantity * item.product.price for item in items)

    def get_discount(self, obj):
        subtotal = self.get_subtotal(obj)
        return round(float(subtotal) * 0.2)  # fix: convert Decimal -> float trước khi round()

    def get_delivery_fee(self, obj):
        return 15

    def get_total(self, obj):
        subtotal = self.get_subtotal(obj)
        discount = self.get_discount(obj)
        delivery_fee = self.get_delivery_fee(obj)
        return subtotal - discount + delivery_fee
