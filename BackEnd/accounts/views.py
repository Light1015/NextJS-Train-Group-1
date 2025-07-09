from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.models import Token
from django.db import IntegrityError, transaction

from .serializers import RegisterSerializer
from .models import CustomUser  # nếu bạn có user custom
import logging
import traceback

logger = logging.getLogger(__name__)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                with transaction.atomic():
                    user = serializer.save()
                    token, created = Token.objects.get_or_create(user=user)

                    response_data = {
                        'success': True,
                        'message': 'Account created successfully!',
                        'token': token.key,
                        'access_token': token.key,
                        'user': {
                            'id': user.id,
                            'email': user.email,
                            'full_name': user.full_name,
                            'is_active': user.is_active,
                        },
                        'auto_login': True,
                    }
                    return Response(response_data, status=status.HTTP_201_CREATED)

            # Nếu serializer không hợp lệ
            print("Register validation errors:", serializer.errors)
            return Response({
                'success': False,
                'message': 'Registration failed. Please check your input.',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError as e:
            import traceback
            traceback.print_exc()
            print("IntegrityError:", str(e))
            return Response({
                'success': False,
                'message': str(e),
                'errors': {
                    'email': ['This email is already registered.']
                }
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("Unexpected error in RegisterView:", str(e))
            traceback.print_exc()
            return Response({
                'success': False,
                'message': str(e),
                'detail': 'Internal error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    """
    Login endpoint with consistent response structure
    """
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.validated_data['user']
                
                # Create or get existing token
                token, created = Token.objects.get_or_create(user=user)
                
                # Log successful login
                logger.info(f"User logged in successfully: {user.email}")
                
                # Return consistent response structure
                response_data = {
                    'success': True,
                    'message': 'Login successful!',
                    'token': token.key,
                    'access_token': token.key,  # For frontend compatibility
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'full_name': user.full_name,
                        'is_active': user.is_active,
                        'last_login': user.last_login.isoformat() if user.last_login else None,
                    }
                }
                
                # Update last login time
                from django.contrib.auth import login
                login(request, user)
                
                return Response(response_data, status=status.HTTP_200_OK)

            # Log validation errors
            logger.warning(f"Login validation failed: {serializer.errors}")
            
            return Response({
                'success': False,
                'message': 'Invalid credentials. Please check your email and password.',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Unexpected error during login: {e}", exc_info=True)
            return Response({
                'success': False,
                'message': 'An unexpected error occurred. Please try again.',
                'detail': 'Login service temporarily unavailable.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutView(APIView):
    """
    Logout endpoint - optional for token cleanup
    """
    def post(self, request):
        try:
            # Get token from Authorization header
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                token_key = auth_header.split(' ')[1]
                try:
                    token = Token.objects.get(key=token_key)
                    user_email = token.user.email
                    token.delete()  # Delete token to invalidate session
                    logger.info(f"User logged out successfully: {user_email}")
                    
                    return Response({
                        'success': True,
                        'message': 'Logged out successfully!'
                    }, status=status.HTTP_200_OK)
                except Token.DoesNotExist:
                    pass
            
            return Response({
                'success': True,
                'message': 'Logged out successfully!'
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error during logout: {e}")
            return Response({
                'success': False,
                'message': 'Logout failed. Please try again.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
