from django.urls import path
from . import views


urlpatterns = [path('',views.search_lawyers),
               path('/result',views.index7),
               path('/result_logged',views.index13),
               path('/lawyer_profile/<int:lawyer_id>', views.LawyerDetailView.as_view(), name='lawyer-detail'),
               path('/retrieve_comment/<int:lawyer_id2>', views.LawyerCommentsView.as_view(), name='lawyer-detail'),
               path('/profile',views.index8),
               path('/profile_logged',views.index14),
               path('/add_comment',views.add_comment),
               path('/create_appointment',views.create_appointment),
               path('/appointment',views.index10),
               path('/taken_appointments',views.taken_appointments),
               ]


