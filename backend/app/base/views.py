from django.shortcuts import render,redirect


import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )
    if user:
        login(request, user)
        return Response({
            'id': user.id,
            'username': user.username,
            'admin': user.is_staff
        })
    return Response({'error': 'Bad credentials'}, status=400)

@api_view(['POST'])
def logout(request):
    logout(request)
    return Response({})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({
        'id': request.user.id,
        'username': request.user.username
    })















@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_json_file(request):
    file_path = '../../frontend/package.json'
    
    if request.method == 'GET':
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            return Response(data)
        except FileNotFoundError:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        try:
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(request.data, file, ensure_ascii=False, indent=2)
            return Response({'message': 'File updated successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)