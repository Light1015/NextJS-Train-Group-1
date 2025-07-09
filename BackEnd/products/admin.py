from django.contrib import admin
from .models import Product, Color, Size
from .models import Category

admin.site.register(Category)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'rating', 'category')
    search_fields = ('name',)
    filter_horizontal = ('colors', 'sizes') 

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)
