from rest_framework import serializers
from .models import *

class CommentSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='userID.first_name', read_only=True)
    user_last_name = serializers.CharField(source='userID.last_name', read_only=True)
    lawyer_first_name = serializers.CharField(source='lawyerID.first_name', read_only=True)
    lawyer_last_name = serializers.CharField(source='lawyerID.last_name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user_first_name', 'user_last_name', 'lawyer_first_name','lawyer_last_name','userID','lawyerID', 'content','respond','note']
        
        
class AppointmentSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='userID.first_name', read_only=True)
    user_last_name = serializers.CharField(source='userID.last_name', read_only=True)
    class Meta:
        model=Appointment
        fields =['id','userID','lawyerID','time','day','accepted_yet','user_first_name','user_last_name']