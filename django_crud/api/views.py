from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def api_users_list(request):
    try:
        users = User.objects.all().order_by('-id')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'Error': 'List of users not found or empty'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_users_create(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'User was successfully created'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def api_user_get(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([AllowAny])
def api_user_update_post(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def api_user_update_patch(request, pk):
    try:
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    except User.DoesNotExist:
        return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def api_user_delete(request, pk):
    try:
        user = User.objects.get(id=pk)
        user.delete()
        return Response('User was successfully deleted')
    except User.DoesNotExist:
        return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)