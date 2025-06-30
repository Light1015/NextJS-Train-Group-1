from rest_framework import viewsets, permissions
from .models import Cart
from .serializers import CartSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User  # 👈 thêm dòng này

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def _get_user(self, request):
        if request.user.is_authenticated:
            return request.user
        return User.objects.first()  # 👈 fallback user tạm thời

    def list(self, request):
        user = self._get_user(request)
        cart, created = Cart.objects.get_or_create(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

@action(detail=False, methods=['post'], url_path='add/(?P<product_id>[^/.]+)')
def add_to_cart(self, request, product_id=None):
    from products.models import Product, Color, Size
    from .models import CartItem

    product = Product.objects.get(id=product_id)
    color_id = request.data.get('color_id')
    size_id = request.data.get('size_id')

    color = Color.objects.get(id=color_id) if color_id else None
    size = Size.objects.get(id=size_id) if size_id else None

    cart, created = Cart.objects.get_or_create(user=request.user)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        color=color,
        size=size,
        defaults={'quantity': 1}
    )
    if not created:
        item.quantity += 1
        item.save()

    return Response({"message": "Product added to cart."})
