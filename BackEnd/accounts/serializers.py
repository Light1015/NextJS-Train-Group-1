from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser
from django.utils.translation import gettext_lazy as _


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'full_name', 'password', 'confirm_password')

    def validate_email(self, value):
        """Xử lý email và kiểm tra trùng lặp."""
        email = value.strip().lower()
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email này đã được sử dụng.")
        return email

    def validate(self, data):
        """Xác thực mật khẩu trùng khớp."""
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Mật khẩu không trùng khớp."})
        return data

    def create(self, validated_data):
        """Tạo người dùng mới."""
        validated_data.pop('confirm_password')
        email = validated_data['email'].strip().lower()
        full_name = validated_data['full_name'].strip()
        password = validated_data['password']
        return CustomUser.objects.create_user(email=email, full_name=full_name, password=password)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError(_('Must include "email" and "password".'))

        email = email.lower().strip()

        user = authenticate(email=email, password=password)
        if user:
            if not user.is_active:
                raise serializers.ValidationError(_('User account is disabled.'))
            data['user'] = user
            return data

        raise serializers.ValidationError(_('Invalid email or password.'))
