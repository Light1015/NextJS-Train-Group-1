from rest_framework import serializers
from .models import Product, Color, Size

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True)
    sizes = SizeSerializer(many=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'image',
            'price',
            'old_price',    
            'discount',     
            'rating',
            'colors',
            'sizes'
        ]
