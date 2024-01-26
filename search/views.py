from django.shortcuts import render,redirect,get_object_or_404
from rest_framework.views import APIView
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from register.models import Lawyer
from .models import Comment
from .serializers import *
from register.serializers import LawyerSerializer  
from login.views import jwt_required

@api_view(['GET'])
def search_lawyers(request):
    first_name = request.query_params.get('first_name', '')
    last_name = request.query_params.get('last_name', '')
    speciality = request.query_params.get('speciality', '')
    location = request.query_params.get('location', '')

   
    conditions = Q()

    if first_name:
        conditions |= Q(first_name__iexact=first_name)
    if last_name:
        conditions |= Q(last_name__iexact=last_name)
    if speciality:
        conditions |= Q(speciality__iexact=speciality)
    if location:
        conditions |= Q(location__iexact=location)

    if not any([first_name, last_name, speciality, location]):
        return Response({'error': 'Please provide at least one search criteria'}, status=400)

    lawyers = Lawyer.objects.filter(conditions)

    serializer = LawyerSerializer(lawyers, many=True)
    return Response(serializer.data, status=200)



class LawyerDetailView(APIView):
    def get(self, request, lawyer_id, *args, **kwargs):
       
        lawyer = get_object_or_404(Lawyer, id=lawyer_id)

       
        lawyer_serializer = LawyerSerializer(lawyer)

       
        return Response(lawyer_serializer.data, status=status.HTTP_200_OK)
    
class LawyerCommentsView(APIView):
    def get(self, request, lawyer_id2, *args, **kwargs):
        try:
            lawyer = get_object_or_404(Lawyer, id=lawyer_id2)
            comments = Comment.objects.filter(lawyerID=lawyer)

            if comments.count() == 1:
                serializer = CommentSerializer(comments.first())
            else:
                serializer = CommentSerializer(comments, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error in LawyerCommentsView: {e}")
            return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['POST'])    
@jwt_required    
def add_comment(request, *args, **kwargs):
    user_id = request.user.id
    advocate_id = request.data.get('advocate_id')

    advocate = get_object_or_404(Lawyer, id=advocate_id)

    comment_data = {
        'userID': user_id,
        'lawyerID': advocate.id,
        'content': request.data.get('content', ''),
        'note':request.data.get('note',None)
    }
    
    print(request.data.get('note'))

    comment_serializer = CommentSerializer(data=comment_data)

    if comment_serializer.is_valid():
        new_comment = comment_serializer.save()
        comments=Comment.objects.filter(lawyerID=int(advocate_id))
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




@api_view(['POST'])
@jwt_required
def create_appointment(request, *args, **kwargs):
    user_id = request.user.id
    advocate_id = request.data.get('advocate_id')
    time = request.data.get('time')
    day = request.data.get('day')
    
    print(user_id, advocate_id, time, day)

    existing_appointment_user = Appointment.objects.filter(
        userID=user_id,
    ).first()

    if existing_appointment_user:
        return Response({'error': "You already made an appointment"},
                        status=status.HTTP_400_BAD_REQUEST)

    existing_appointment_advocate = Appointment.objects.filter(
        lawyerID=advocate_id,
        time=time,
        day=day,
    ).first()

    if existing_appointment_advocate:
        return Response({'error': "The advocate already has an appointment at this time and day."},
                        status=status.HTTP_400_BAD_REQUEST)

    advocate = get_object_or_404(Lawyer, id=advocate_id)

    appointment_data = {
        'userID': user_id,
        'lawyerID': advocate_id,
        'time': time,
        'day': day, 
        'accepted_yet': False
    }
    serializer = AppointmentSerializer(data=appointment_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def taken_appointments(request):
    lawyer_id = request.query_params.get('lawyer_id')
    print(lawyer_id)
    taken_appointments = Appointment.objects.filter(lawyerID=lawyer_id, accepted_yet=False)
    print(taken_appointments)
    serializer = AppointmentSerializer(taken_appointments, many=True)
    print(serializer.data)

    return Response(serializer.data)


def index10(request):
    return render(request,'index10.html')

def index7(request):
    return render(request,'index7.html')

def index8(request):
    return render(request,'index8.html')

def index13(request):
    return render(request,'index13.html')

def index14(request):
    return render(request,'index14.html')