from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .serializers import LoginSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_test(request):
    return Response({'Все отлично?': '-определенно'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_get_token(request):
    #import pdb; pdb.set_trace()
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        return Response(
            {
                'token': serializer.data.get('token', None),
            },
            status=status.HTTP_200_OK,
        )
