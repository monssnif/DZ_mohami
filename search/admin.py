from django.contrib import admin
from search.models import *

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display=('userID','lawyerID','content','respond','note')
    search_fields=('userID','lawyerID')
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display=('userID','lawyerID','time','day','accepted_yet')
    search_fields=('userID','lawyerID')