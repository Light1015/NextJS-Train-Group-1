from rest_framework import serializers
from .models import Product, Color, Size, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        
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
    category = CategorySerializer()

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
            'sizes',
            'category'
        ]
