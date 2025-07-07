from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import CartItem
from .serializers import CartItemSerializer


class CartListCreateView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get("product")
        size = request.data.get("size")
        color = request.data.get("color")
        quantity = int(request.data.get("quantity", 1))

    # Chuyển product_id thành int và dùng để filter
        try:
            product_id = int(product_id)
        except (TypeError, ValueError):
            return Response({"detail": "Invalid product ID."}, status=status.HTTP_400_BAD_REQUEST)

        existing_item = CartItem.objects.filter(
            user=user,
            product=product_id,  # ✅ đúng kiểu ForeignKey
            size=size,
            color=color
        ).first()

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Nếu chưa có, tạo mới
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Serializer lỗi:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
