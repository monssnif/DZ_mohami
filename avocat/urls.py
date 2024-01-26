from django.urls import path
from . import views


urlpatterns = [path('',views.index11),
               path("add_reply",views.add_reply_to_comment),
               path('appointments/<int:lawyer_id>', views.get_appointments),
               path('appointments/<int:appointment_id>/accept/', views.accept_appointment, name='accept_appointment'),
               path('appointments/<int:appointment_id>/reject/', views.reject_appointment, name='reject_appointment'),
               path('update_location/<int:lawyer_id>',views.update_lawyer_location),
               path('update_description/<int:lawyer_id>',views.update_lawyer_description),
               path('update_speciality/<int:lawyer_id>',views.update_lawyer_speciality),
               path('update_image/<int:lawyer_id>',views.update_lawyer_image)
    
]
