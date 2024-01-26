from django.db import models
from register.models import *

class Comment(models.Model):
    userID=models.ForeignKey(User,on_delete=models.CASCADE)
    lawyerID=models.ForeignKey(Lawyer,on_delete=models.CASCADE)
    content=models.TextField(max_length=(1000),blank=True,null=True,default='')
    note=models.IntegerField(blank=True,null=True,default=None)
    respond=models.TextField(max_length=(1000),blank=True,null=True,default='')
    
class Appointment(models.Model):
    userID=models.ForeignKey(User,on_delete=models.CASCADE)
    lawyerID=models.ForeignKey(Lawyer,on_delete=models.CASCADE)
    time=models.CharField(max_length=10,blank=True,null=True)
    day=models.CharField(max_length=20,blank=True,null=True)
    accepted_yet=models.BooleanField(default='False',blank=True,null=True)
