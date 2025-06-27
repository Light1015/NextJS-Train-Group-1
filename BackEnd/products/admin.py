from django.contrib import admin
from .models import Product, Color, Size

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'rating')
    search_fields = ('name',)
    filter_horizontal = ('colors', 'sizes') 

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)
