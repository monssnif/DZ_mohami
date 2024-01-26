from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from login.views import jwt_required


@api_view(['POST'])
def logout(request):
    try:
         return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Exception as e:
         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
