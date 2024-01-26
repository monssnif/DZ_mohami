from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from search.models import *
from django.views.decorators.http import require_http_methods
from search.serializers import *
from login.views import jwt_required
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from register.serializers import *
import json

def index11(request):
    return render(request,'index11.html')



@api_view(['POST'])
def add_reply_to_comment(request):
    try:
        print(request.data)
        comment_id = request.data.get('commentId')
        print(comment_id)
        comment = Comment.objects.get(pk=comment_id)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        reply_text = request.data.get('reply', '')

        if not reply_text:
            return Response({'error': 'Reply cannot be empty'}, status=status.HTTP_400_BAD_REQUEST)

        comment.respond = reply_text
        comment.save()

        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




def get_appointments(request, lawyer_id):
    print('hu')
    try:
        appointments = Appointment.objects.filter(lawyerID=lawyer_id, accepted_yet=False)
        serializer = AppointmentSerializer(appointments, many=True)
        return JsonResponse(serializer.data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
  
     
@require_http_methods(["PATCH"])
def accept_appointment(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)
    appointment.accepted_yet = True
    appointment.save()

    serializer = AppointmentSerializer(appointment)
    return JsonResponse(serializer.data)


@require_http_methods(["DELETE"])
def reject_appointment(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)
    appointment.delete()

    return JsonResponse({'message': 'Appointment deleted successfully'})


@api_view(['PATCH'])
def update_lawyer_location(request, lawyer_id):
    if request.method == 'PATCH':
        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)
            new_location = request.data.get('location')  
            lawyer.location = new_location
            lawyer.save()

            return Response({'message': 'Location updated successfully'}, status=status.HTTP_200_OK)

        except Lawyer.DoesNotExist:
            return Response({'error': 'Lawyer not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PATCH'])
def update_lawyer_description(request, lawyer_id):
    print(request.data.get('description'))
    if request.method == 'PATCH':
        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)
            new_description = request.data.get('description')  
            lawyer.description = new_description
            lawyer.save()

            return Response({'message': 'description updated successfully'}, status=status.HTTP_200_OK)

        except Lawyer.DoesNotExist:
            return Response({'error': 'Lawyer not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PATCH'])
def update_lawyer_speciality(request, lawyer_id):
    if request.method == 'PATCH':
        try:
            lawyer = Lawyer.objects.get(id=lawyer_id)
            new_speciality = request.data.get('speciality')  

            # Update the location
            lawyer.speciality = new_speciality
            lawyer.save()

            return Response({'message': 'Location updated successfully'}, status=status.HTTP_200_OK)

        except Lawyer.DoesNotExist:
            return Response({'error': 'Lawyer not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PATCH'])
def update_lawyer_image(request, lawyer_id):
    try:
        lawyer = Lawyer.objects.get(id=lawyer_id)
        serializer = LawyerSerializer(lawyer, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Lawyer.DoesNotExist:
        return Response({"error": "Lawyer not found"}, status=status.HTTP_404_NOT_FOUND)