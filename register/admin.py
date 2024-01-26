from django.contrib import admin
from  register.models import*

@admin.register(Lawyer)
class LawyerAdmin(admin.ModelAdmin):
    list_display = ( 'first_name', 'last_name', 'email','password','phone_number', 'speciality','location','description','image')
    search_fields = ( 'first_name', 'last_name',  'speciality','location')
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','first_name','last_name','email','password','is_active')
    search_fields =('first_name','last_name',)